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

    if (isset($_COOKIE['selectedCountry'])) {
        $selectedCountry = $_COOKIE['selectedCountry'];

        // Check if the URL starts with "https://test.frokme.winauthority.net" (excluding "/uk")
        if (strpos($currentURL, 'https://test.frokme.winauthority.net') === 0 && strpos($currentURL, 'https://test.frokme.winauthority.net/uk') !== 0) {
            if ($selectedCountry === 'lk') {
                return;
            } else {
                if (strpos($_SERVER['REQUEST_URI'], '/uk') === 0 && $selectedCountry == 'lk') {
                    wp_safe_redirect('https://test.frokme.winauthority.net/', 302);
                    exit;
                } else if ($selectedCountry === 'in') {
                    wp_safe_redirect('https://test.frokme.winauthority.net/uk' . $_SERVER['REQUEST_URI'], 302);
                    exit;
                } else {
                    wp_safe_redirect('https://test.frokme.winauthority.net' . $_SERVER['REQUEST_URI'], 302);
                    exit;
                }
            }
        } elseif (strpos($currentURL, 'https://test.frokme.winauthority.net/uk') === 0 && $selectedCountry == 'in') {
            // User is on the "uk" site, and the cookie matches, so return
            return;
        } else {
            if ($_COOKIE['selectedCountry'] == 'lk') {
                if (strpos($_SERVER['REQUEST_URI'], '/uk') === 0) {
                    wp_safe_redirect('https://test.frokme.winauthority.net/', 302);
                    exit;
                } else {
                    wp_safe_redirect('https://test.frokme.winauthority.net' . $_SERVER['REQUEST_URI'], 302);
                    exit;
                }
            } elseif ($_COOKIE['selectedCountry'] == 'in') {
                wp_safe_redirect('https://test.frokme.winauthority.net/uk' . $_SERVER['REQUEST_URI'], 302);
            }
        }
    } else {
        wp_safe_redirect(site_url() . '/country-selection?redirect=' . $_SERVER['REQUEST_URI'], 302);
        exit;
    }
}

// Hook into the template redirect action to check for country selection
add_action('template_redirect', 'check_country_selection');


add_action('wp_enqueue_scripts', 'basel_child_enqueue_styles', 1000);

function basel_child_enqueue_styles()
{
    $version = basel_get_theme_info('Version');

    if (basel_get_opt('minified_css')) {
        wp_enqueue_style('basel-style', get_template_directory_uri() . '/style.min.css', array('bootstrap'), $version);
    } else {
        wp_enqueue_style('basel-style', get_template_directory_uri() . '/style.css', array('bootstrap'), $version);
    }

    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('bootstrap'), $version);
}
