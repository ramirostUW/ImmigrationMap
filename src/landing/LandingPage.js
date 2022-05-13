import React, { useRef, useEffect } from 'react';
import { useLocation, Routes as Switch, Route } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';

import './assets/scss/style.scss';

const LandingPage = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  /*
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
        </Switch>
      )} />
  );

  */
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
          <LayoutDefault><Home /></LayoutDefault>
      )} />
  );
}

export default LandingPage;