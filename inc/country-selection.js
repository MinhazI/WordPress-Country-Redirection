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
        window.location.href = country === 'in' ? 'https://test.frokme.winauthority.net/uk/' + redirectValue.replace('/uk', '') : 'https://test.frokme.winauthority.net/' + redirectValue.replace('/uk', '');
    }
});
