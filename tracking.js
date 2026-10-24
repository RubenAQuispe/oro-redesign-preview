// ORO Homes — Shared Tracking (phone clicks + form submissions)
// Loaded after gtag.js is initialized on every page.
// Google Ads Account: AW-16663986384

document.addEventListener('DOMContentLoaded', function () {
  // Track phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-16663986384/aF8VCJf7oO8bENCBgYo-',
          'value': 1.0,
          'currency': 'USD'
        });
        gtag('event', 'phone_click', {
          'event_category': 'contact',
          'event_label': el.href
        });
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Contact');
      }
    });
  });

  // Track form submissions
  // Uses preventDefault + event_callback + safety timeout to ensure the
  // gtag beacon fires before the browser navigates away on native POST forms.
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      // If another handler already called preventDefault (e.g. consultation
      // modals that use fetch), just fire tracking and don't manage submission.
      if (e.defaultPrevented) {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': 'AW-16663986384/HjmDCJT7oO8bENCBgYo-',
            'value': 1.0,
            'currency': 'USD'
          });
          gtag('event', 'form_submit', {
            'event_category': 'contact',
            'event_label': form.name || 'unknown'
          });
        }
        if (typeof fbq === 'function') fbq('track', 'Lead');
        return;
      }

      // Native-submit forms: hold submission until gtag beacon sends
      if (typeof gtag === 'function') {
        e.preventDefault();
        var submitted = false;
        var doSubmit = function () {
          if (!submitted) {
            submitted = true;
            form.submit();
          }
        };
        gtag('event', 'conversion', {
          'send_to': 'AW-16663986384/HjmDCJT7oO8bENCBgYo-',
          'value': 1.0,
          'currency': 'USD',
          'event_callback': doSubmit
        });
        // Safety timeout — always submit even if gtag is slow or fails
        setTimeout(doSubmit, 1000);
        gtag('event', 'form_submit', {
          'event_category': 'contact',
          'event_label': form.name || 'unknown'
        });
      }
      if (typeof fbq === 'function') fbq('track', 'Lead');
    });
  });
});
