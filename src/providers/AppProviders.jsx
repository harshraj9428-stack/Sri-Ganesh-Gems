import React, { useState, useEffect } from 'react';
import { db, auth as firebaseAuth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';
import { ToastProvider } from '../contexts/ToastContext';
import { AdminContext } from '../contexts/AdminContext';
import { GemsContext } from '../contexts/GemsContext';
import { SiteContext } from '../contexts/SiteContext';
import { INITIAL_GEMS } from '../data/gems';
import { DEFAULT_SITE_SETTINGS } from '../data/siteSettings';
import { AppSkeleton } from '../components/shared/AppSkeleton';

export const AppProviders = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [gems, setGems] = useState([]);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Auth listener
    const unsubAuth = onAuthStateChanged(firebaseAuth, (user) => {
      setAuth(!!user);
    });

    // Listen to gems collection
    const unsubGems = onSnapshot(collection(db, 'gems'), (snapshot) => {
      if (snapshot.empty) {
        setGems(INITIAL_GEMS);
      } else {
        const fetchedGems = snapshot.docs.map(doc => {
          const data = doc.data();
          // Sanitize typos from database
          if (data.benefits) {
            data.benefits = data.benefits
              .replace(/sharpensthe/g, 'sharpens the')
              .replace(/stress \./g, 'stress.');
          }
          return { id: doc.id, ...data };
        });
        setGems(fetchedGems);
      }
    }, (error) => {
      console.error("Error listening to gems:", error);
      setGems(INITIAL_GEMS);
    });

    // Listen to site settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
      if (docSnap.exists()) {
        const parsed = docSnap.data();
        // Migration: update old unsplash URLs to new local bg
        if (parsed.heroImage?.includes('unsplash.com/photo-1515562141207-7a88fb7ce338')) {
          parsed.heroImage = "/new_bg.png";
        }
        if (parsed.heritageImage?.includes('unsplash.com/photo-1605100804763-247f67b3557e') || parsed.heritageImage === "/new_bg.png") {
          parsed.heritageImage = "/pic_new.png";
        }
        setSiteSettings(prev => ({ ...prev, ...parsed }));
      } else {
        setSiteSettings(DEFAULT_SITE_SETTINGS);
      }
      setDataLoaded(true);
    }, (error) => {
      console.error("Error listening to site settings:", error);
      setDataLoaded(true);
    });

    // Fallback: If Firebase is slow or hanging (e.g. DB not created yet), stop loading after 2.5s
    const fallbackTimer = setTimeout(() => {
      setDataLoaded(true);
    }, 2500);

    return () => {
      unsubGems();
      unsubSettings();
      unsubAuth();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // No need for localforage.setItem effects anymore since Firestore handles state in the cloud
  // Admin dashboard will write to Firestore, which triggers onSnapshot and updates state

  if (!dataLoaded) {
    return <AppSkeleton />;
  }

  return (
    <ToastProvider>
      <AdminContext.Provider value={{ auth, setAuth }}>
        <GemsContext.Provider value={{ gems, setGems }}>
          <SiteContext.Provider value={{ siteSettings, setSiteSettings }}>
            {children}
          </SiteContext.Provider>
        </GemsContext.Provider>
      </AdminContext.Provider>
    </ToastProvider>
  );
};
