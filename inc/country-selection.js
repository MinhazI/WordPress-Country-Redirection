// JavaScript code on your country selection page
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('select-country')) {
        var country = event.target.getAttribute('data-country');
        document.cookie = "country=" + country + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; priority=high;";
        // Redirect the user to the appropriate website based on their selection
        // Get the query string part of the current URL
        var queryString = window.location.search;

        // Create a URLSearchParams object to parse the query string
        var urlParams = new URLSearchParams(queryString);

        // Access the value of the "redirect" parameter
        var redirectValue = urlParams.get('redirect');
        if(redirectValue && redirectValue.length > 0){
            window.location.href = country === 'in' ? 'https://test.frokme.winauthority.net/uk/' + redirectValue.replace('/uk', '') : 'https://test.frokme.winauthority.net/' + redirectValue.replace('/uk', '');
        } else {
            window.location.href = country === 'in' ? 'https://test.frokme.winauthority.net/uk/' : 'https://test.frokme.winauthority.net/';
        }
    }
});

(function() {
    function checkCountrySelection() {
        var currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;

        if (isPage('country-selection')) {
            // Do nothing on the country selection page
            return;
        }

        var countryCookie = getCookie('country');

        if (countryCookie) {
            var country = countryCookie;

            if (currentURL.startsWith('https://test.frokme.winauthority.net') && !currentURL.startsWith('https://test.frokme.winauthority.net/uk')) {
                if (country === 'lk') {
                    return;
                } else {
                    if (window.location.pathname.startsWith('/uk') && country === 'lk') {
                        window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname.substring(3);
                    } else if (country === 'in') {
                        window.location.href = 'https://test.frokme.winauthority.net/uk' + window.location.pathname;
                    } else {
                        window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname;
                    }
                }
            } else if (currentURL.startsWith('https://test.frokme.winauthority.net/uk') && country === 'in') {
                // User is on the "uk" site, and the cookie matches, so return
                return;
            } else {
                if (country === 'lk') {
                    if (window.location.pathname.startsWith('/uk')) {
                        window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname.substring(3);
                    } else {
                        window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname;
                    }
                } else if (country === 'in') {
                    window.location.href = 'https://test.frokme.winauthority.net/uk' + window.location.pathname;
                }
            }
        } else {
            window.location.href = siteURL() + '/country-selection?redirect=' + window.location.pathname;
        }
    }

    function isPage(pageName) {
        return window.location.pathname.includes(pageName);
    }

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    function siteURL() {
        return window.location.protocol + "//" + window.location.host;
    }

    checkCountrySelection();
})();


// document.addEventListener("DOMContentLoaded", function() {
//     function checkCountrySelection() {
//     var currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;

//     if (isPage('country-selection')) {
//         // Do nothing on the country selection page
//         return;
//     }

//     var countryCookie = getCookie('country');

//     if (countryCookie) {
//         var country = countryCookie;

//         if (currentURL.startsWith('https://test.frokme.winauthority.net') && !currentURL.startsWith('https://test.frokme.winauthority.net/uk')) {
//             if (country === 'lk') {
//                 return;
//             } else {
//                 if (window.location.pathname.startsWith('/uk') && country === 'lk') {
//                     window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname.substring(3);
//                 } else if (country === 'in') {
//                     window.location.href = 'https://test.frokme.winauthority.net/uk' + window.location.pathname;
//                 } else {
//                     window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname;
//                 }
//             }
//         } else if (currentURL.startsWith('https://test.frokme.winauthority.net/uk') && country === 'in') {
//             // User is on the "uk" site, and the cookie matches, so return
//             return;
//         } else {
//             if (country === 'lk') {
//                 if (window.location.pathname.startsWith('/uk')) {
//                     window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname.substring(3);
//                 } else {
//                     window.location.href = 'https://test.frokme.winauthority.net' + window.location.pathname;
//                 }
//             } else if (country === 'in') {
//                 window.location.href = 'https://test.frokme.winauthority.net/uk' + window.location.pathname;
//             }
//         }
//     } else {
//         window.location.href = siteURL() + '/country-selection?redirect=' + window.location.pathname;
//     }
// }

// function isPage(pageName) {
//     return window.location.pathname.includes(pageName);
// }

// function getCookie(cookieName) {
//     var name = cookieName + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var cookieArray = decodedCookie.split(';');
//     for (var i = 0; i < cookieArray.length; i++) {
//         var cookie = cookieArray[i];
//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1);
//         }
//         if (cookie.indexOf(name) === 0) {
//             return cookie.substring(name.length, cookie.length);
//         }
//     }
//     return "";
// }

// function siteURL() {
//     return window.location.protocol + "//" + window.location.host;
// }

// checkCountrySelection();

// });
