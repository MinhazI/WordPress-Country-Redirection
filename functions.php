<?php

function country_selection_script()
{
    wp_enqueue_script('country-selection-script', get_stylesheet_directory_uri() . '/inc/country-selection.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'country_selection_script');

/**
 * Check if the user needs to select a country.
 */

function check_country_selection()
{
    $currentURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    if (is_page('country-selection')) {
        // Do nothing on the country selection page
        return;
    }

    if (isset($_COOKIE['country'])) {
        $country = $_COOKIE['country'];

        // Check if the URL starts with "https://test.frokme.winauthority.net" (excluding "/uk")
        if (strpos($currentURL, 'https://test.frokme.winauthority.net') === 0 && strpos($currentURL, 'https://test.frokme.winauthority.net/uk') !== 0) {
            if ($country === 'lk') {
                return;
            } else {
                if (strpos($_SERVER['REQUEST_URI'], '/uk') === 0 && $country == 'lk') {
                    wp_safe_redirect('https://test.frokme.winauthority.net/' . ltrim($_SERVER['REQUEST_URI'], '/uk'));
                    exit;
                } else if ($country === 'in') {
                    wp_safe_redirect('https://test.frokme.winauthority.net/uk' . $_SERVER['REQUEST_URI']);
                    exit;
                } else {
                    wp_safe_redirect('https://test.frokme.winauthority.net' . $_SERVER['REQUEST_URI']);
                    exit;
                }
            }
        } elseif (strpos($currentURL, 'https://test.frokme.winauthority.net/uk') === 0 && $country == 'in') {
            // User is on the "uk" site, and the cookie matches, so return
            return;
        } else {
            if ($country === 'lk') {
                if (strpos($_SERVER['REQUEST_URI'], '/uk') === 0) {
                    wp_safe_redirect('https://test.frokme.winauthority.net/' . ltrim($_SERVER['REQUEST_URI'], '/uk'));
                    exit;
                } else {
                    wp_safe_redirect('https://test.frokme.winauthority.net' . $_SERVER['REQUEST_URI']);
                    exit;
                }
            } elseif ($country == 'in') {
                wp_safe_redirect('https://test.frokme.winauthority.net/uk' . $_SERVER['REQUEST_URI']);
                exit;
            }
        }
    } else {
        wp_safe_redirect(site_url() . '/country-selection?redirect=' . $_SERVER['REQUEST_URI']);
    }
}

// Hook into the template redirect action to check for country selection
add_action('template_redirect', 'check_country_selection');
