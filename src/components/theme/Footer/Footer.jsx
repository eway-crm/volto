/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { injectIntl } from 'react-intl';

const TAWKTO_TEMPLATE_CS = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
 (function(){
 var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
 s1.async=true;
 s1.src='https://embed.tawk.to/59e7276f4854b82732ff63d6/1bsogr4gc';
 s1.charset='UTF-8';
 s1.setAttribute('crossorigin','*');
 s0.parentNode.insertBefore(s1,s0);
 })();`;

 const TAWKTO_TEMPLATE_EN = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
 (function(){
 var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
 s1.async=true;
 s1.src='https://embed.tawk.to/618594316bb0760a494157e6/1fjoslol8';
 s1.charset='UTF-8';
 s1.setAttribute('crossorigin','*');
 s0.parentNode.insertBefore(s1,s0);
 })();`;

const GA4 = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CNK4S6L6G7');`;

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: intl.locale === 'cs' ? TAWKTO_TEMPLATE_CS : TAWKTO_TEMPLATE_EN,
        }}
      />
      <script async="async" src="https://www.googletagmanager.com/gtag/js?id=G-CNK4S6L6G7" />
      <script dangerouslySetInnerHTML={{ __html: GA4 }} />
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
