# Changelog - Prakash Dashboard

All notable changes to the Prakash AMB 2.0 T³ Dashboard will be documented in this file.

---

## [Unreleased] - 2026-02-11

### Added
- **Enhanced High-Risk Monitoring (Treat Page)**:
    - Added dedicated, color-coded tables for **Severe** (Red), **Moderate** (Orange), and **Mild** (Yellow) anemia categories on the Treat page.
    - Optimized columns for medical follow-up: `Subject ID`, `Village`, `Name`, `Household Name`, `HB`, `Beneficiary`, `Asha Worker`, and `Notify Asha (WhatsApp)`.
    - Integrated corresponding KPI cards for all three anemia categories at the top of the Treat page.
    - Added a more prominent **Geospatial Boundary** to the Treat page map for better spatial awareness.
- **Dietary Data Alignment**: Standardized column mapping to exactly match the dataset (specifically focusing the Dietary KPI on `Diet 1`).
- **Test Page Column Optimization**: Removed follow-up columns (`Asha Worker`, `Notify Asha`) from the main Beneficiary table on the Test page to keep it streamlined for general tracking.
- **Intelligent Navigation**:
    - Implemented a dynamic navigation system that highlights the active page (**Test**, **Treat**, **Track**) in the top bar.
    - Re-styled navigation to a standardized, uniform look across all pages.
- **Data Synchronization Optimization**:
    - Implemented a **Persistent Cache** (`sync_cache.json`) to preserve sync history across server restarts.
    - Refined row-level diffing logic to ensure zero redundant uploads to the Google Sheets backend.

### Changed
- **Terminology Shift**: Globally rebranded from "Patients" to "**Beneficiaries**" across all UI headers, map tooltips, chart legends, and documentation.
- **Asset Loading Performance**: Enabled `eager_loading=True` and local asset serving to resolve "Loading chunk failed" errors and ensure 100% dashboard availability.

### Fixed
- **Geospatial Precision**: Updated coordinates for 20+ villages (Balutagi, Chikwankal Kunta, etc.) for 100% mapping accuracy in the Koppal district.
- **Navigation Stability**: Resolved "Nonexistent object" errors when switching between Multi-page layouts by adding hidden callback placeholders.

---

## [v2.4.0] - 2026-02-10

### Added
- **Statistical Analysis Chart**: Added a Village-wise Hemoglobin Analysis chart featuring Mean and Standard Deviation (Error Bars).
- **Global Average Line**: Added a dynamic horizontal dashed line representing the average HGB of the current filtered dataset.
- **Village-wise Breakdown**: Replaced Area-wise charts with Village-wise (PSU Name) granular data for better local monitoring.
- **Anemic Count Integration**: Added total anemic patient counts (Mild+Moderate+Severe) directly into the chart tooltips.
- **Pregnancy-Safe BMI Logic**: Implemented specific thresholds for pregnant beneficiaries (Obese if BMI >= 30, otherwise "Pregnancy" category).
- **Institutional Branding**: Integrated official Government of Karnataka and St. John's Research Institute logos into the unified header.
- **"Baseline 1" Markers**: Added glowing status badges on Test, Treat, and Track pages to denote the current data phase.
- **Dual Diet Tracking**: Added support for "Diet 1" and "Diet 2" data mapping while preserving original KPI consistency.
- **Full Data Mirroring**: Expanded background sync to include all 25+ columns (Email, Status, Investigator, Diet, etc.) back to the backend Google Sheet.
- **Map Progress Indicators**: Added status markers (Red: No Data, Orange: In Progress, Green: Complete) to PSU map bubbles.

### Changed
- **Server Configuration**: Moved the dashboard from port 8050 to **8060** to avoid conflicts.
- **Professional Styling (T³ Overhaul)**:
    - Implemented **Inter** typography for a modern, research-grade feel.
    - Switched to a premium color palette (Indigo/Slate).
    - Added **Unified Hover Mode** for medical classification charts, showing all categories in one box.
    - Improved tooltip contrast (dark text on light background) and added borders.
- **Layout Optimization**: Arranged classification and statistical charts side-by-side in a responsive grid.
- **Map Migration**: Migrated to the latest Plotly `Scattermap` and `Choroplethmap` engines for better performance and stability without Mapbox requirement.
- **Label Standardization**: Globally replaced "Unknown" with **"Missing"** across all charts, tables, tooltips, and map legends for professional clarity.
- **Simplified Nutritional Categories**: Streamlined reporting by grouping into: Wasted, Thinness, Underweight, Normal, Overweight, Obese, Pregnancy, and Missing.
- **Treat Page Optimization**: Aligned KPI cards with Test page design (added icons and premium typography) and simplified layout to focus on map.
- **Global Footer**: Centralized and standardized the ICMR CAR MEDTECH LAB copyright footer across all dashboard pages.

### Fixed
- **Tooltip Visibility**: Fixed an issue where hover dialogue boxes were hard to read or not appearing due to data serialization.
- **Anemia Logic**: Refined `classify_anemia_who` for more robust handling of age and beneficiary types.
- **Coordinate Accuracy**: Verified and corrected village coordinates for precise mapping (Rampura, Kesoor, etc.).
- **Age Calculation Bug**: Resolved a critical timezone error ("Cannot mix tz-aware with tz-naive") in the background data processing thread.
- **Date Formatting (Report Generator)**: Fixed an issue in `code.js` where dates appeared as long GMT strings; now uses formatted text from the source sheet.
- **Multi-Page Stability**: Standardized callback placeholders to prevent ID errors when switching between Test and Treat pages.
- **UI Cleanup**: Removed redundant "Management Tools" sections from the dashboard sidebar.
- **Map Coordinate Updates**: Fixed coordinates for Tadkal, Kawalbodur, HireGonnagar, and others for exact placement.

---

## [v2.3.0] - 2026-02-07 - WHO BMI Implementation

### Added
- **WHO Anthro BMI Z-Score System**:
    - Integrated WHO Child Growth Standards (0-5 years) and WHO Reference 2007 (5-19 years)
    - Created `who_standards.py` module for complex LMS (Lambda-Mu-Sigma) calculations
    - Implemented age/sex-specific Z-score calculations for children
    - Added hybrid logic: Z-score analysis for children, standard BMI cutoffs for adults (19+ years)
- **BMI-Based Nutritional Status Analysis**:
    - Automatic BMI categorization (Underweight, Normal, Overweight, Obese)
    - Intelligent measurement fallback: prioritizes "Height" column, falls back to "Length" for infants
    - New "Nutritional Status Analysis" distribution bar chart
    - BMI category included in beneficiary table and data exports
- **Dietary Compliance Monitoring**:
    - New KPI card for "Dietary Yes" beneficiary count
    - Uses "Diet1" column with case-insensitive "Yes" counting

### Changed
- **Layout Optimization**: Swapped PSU-wise Anemia Classification and Nutritional Status charts for better readability
- **Full-Width Village Classification**: PSU-wise classification chart now has full-width visibility

### Fixed
- **Callback Output Mismatch**: Resolved JavaScript error from output count mismatch in `update_dashboard` error handling (7 to 8 items)

---

## [v2.2.0] - 2026-02-05 - Filter System Debugging

### Fixed
- **Default Filter Selection**: Debugged and resolved issue where "Wadganhal" was automatically selected in PSU filter
- **Filter Interaction Logic**: Improved filter interaction handling to prevent unintended default selections

---

## [v2.1.0] - 2026-01-31 - Layout Restructuring

### Changed
- **Grid-Based Layout**: Converted from fixed sidebar to responsive grid-based system
- **Filter Placement**: Moved filters to left column alongside charts and KPIs for integrated report-style view
- **Responsive Design**: Implemented `dbc.Container`, `dbc.Row`, and `dbc.Col` for two-column layout
- **CSS Updates**: Modified `style_v2.css` to support new grid structure

---

## [v2.0.0] - 2026-01-30 - WHO Anemia Classification & Major UI Overhaul

### Added
- **WHO-Based Automatic Anemia Classification**:
    - Created `classify_anemia_who()` function with WHO guidelines for all population groups
    - Beneficiary-specific thresholds for Pregnant Women, Children (5-59 months, 5-9 years), Adolescents, and Women of Reproductive Age
    - Age-based fallback classification when beneficiary type is unclear
    - New `anemia_category_auto` column for WHO-based classifications
    - Side-by-side comparison of manual vs automatic classification in patient table
- **Enhanced Branding & Navigation**:
    - Unified fixed top bar (90px) with "PRAKASH AMB 2.0 T³" title and St. John's Research Institute logo
    - Enlarged branding: "PRAKASH" title (1.75rem) and research institute logo (70px)
    - Mobile branding: Added research institute logo (45px) to mobile navigation
    - Refined glowing "T³" teal badge with medical-grade luminescence
- **Streamlined Sidebar**:
    - Converted to high-density "Filter & Tools" pane
    - Added context label: "Real-time Health Surveillance | Koppal, Karnataka" in black font
    - Flat, always-visible filter layout for Beneficiary Type and Anemia Status
- **Merged Location Filter**:
    - Combined "Area Code" and "PSU Selection" into single "Location Selection" dropdown
    - Format: `PSU Name (Area Code)` for intuitive filtering
    - Updated all callbacks to support new combined location filter

### Changed
- **Anemia Classification Logic Refinement**:
    - Prioritizes Beneficiary Type for classification
    - Uses Age as fallback when beneficiary type is unclear
    - Robust handling of missing data (HGB always required, Age optional if Beneficiary clear)
    - Safe age conversion allowing `None` values
- **KPI Updates**:
    - All KPIs now use automatic WHO classification
    - Added percentages to Normal, Mild, Moderate, and Severe counts
    - Added Anemia Prevalence (%) KPI
- **Chart Updates**:
    - All charts (Pie, Bar, Stacked) use `anemia_category_auto`
    - Anemia Status filter uses automatic classification

### Fixed
- **Mobile Responsiveness**: Fixed desktop top-bar overlapping sidebar toggle on mobile
- **Layout Redundancy**: Removed redundant "top-header" section, shifted KPIs up
- **Callback Errors**: 
    - Fixed `update_dashboard` early return value count mismatch
    - Added safety checks for empty datasets and division-by-zero in BMI calculations
    - Robust filter type enforcement in data export callback
- **KPI Label Formatting**: Removed CSS rule forcing uppercase, allowing mixed-case units like "(g/dL)"

---

## [v1.8.0] - 2026-01-29 - Village Coordinate Updates

### Added
- **Accurate Village Coordinates**: Researched and added missing coordinates for all villages
- **Coordinate Verification**: Systematically verified all coordinates against Google Maps

### Changed
- **Updated Coordinates**: Modified `app2.py` with accurate, verified village locations
- **Map Accuracy**: Ensured all village markers correctly placed within Koppal district

---

## [v1.7.0] - 2026-01-28 - UI Polish & Chart Fixes

### Added
- **Hemoglobin Unit Display**:
    - Added "(g/dL)" unit to "Avg Hb" KPI card
    - Renamed table column from "HGB" to "HGB (g/dL)"

### Fixed
- **Filter Dropdown Display**: Resolved issue where not all options were visible in filter dropdowns
- **Chart Overlaps**: 
    - Increased chart container heights to 400px
    - Improved margins and padding around chart titles and axes
    - Moved legends below charts (horizontal layout) to maximize drawing area
    - Added automatic axis margins and 45° rotated labels for Subject Group chart

---

## [v1.6.0] - 2026-01-27 - Coordinate Verification & Typography

### Changed
- **Final Coordinate Verification**: Verified all village coordinates against Google Maps and reliable sources
- **Precise Locations**: Updated `app2.py` with precise, verified coordinates for all villages
- **Typography**: Removed bold formatting from all dashboard fonts for cleaner visual experience
- **Font Stack**: Updated to cleaner font stack with normal font weight globally
- **Map Labels**: Changed from `Arial Black` to `Arial` for map labels
- **DataTable Headers**: Changed header weight from `bold` to `normal`

### Fixed
- **Map Framing**: 
    - Increased map `maxHeight` to 1300px
    - Adjusted `aspectRatio` to 1:1.15 for better vertical space
    - Reduced `map_zoom` to 8.3 and refined center to ensure all villages visible

---

## [v1.5.0] - 2026-01-23 - Deployment Preparation

### Added
- **GitHub Repository Setup**: Prepared project for GitHub hosting
- **Deployment Configuration**:
    - Created `Procfile` for Render deployment
    - Updated `requirements.txt` with all dependencies
    - Added `README.md` with installation and deployment instructions
- **Hosting Documentation**: Added instructions for Render.com deployment

---

## [v1.4.0] - 2026-01-21 - Performance Optimization

### Added
- **Data Caching System**: Implemented `dcc.Store` for client-side data caching
- **Background Refresh**: Automatic data refresh every 30 seconds without blocking UI
- **Loading Indicators**: Added loading states for better user feedback

### Changed
- **Instant Filter Response**: Filters now update near-instantaneously using cached data
- **Optimized Data Fetching**: Reduced redundant API calls through intelligent caching

### Fixed
- **Dashboard Refresh**: Implemented selective refresh logic to update only KPI numbers during periodic intervals
- **Load Performance**: Reduced initial load times and enhanced perceived responsiveness

---

## [v1.3.0] - 2026-01-20 - Map Enhancements & Mobile Optimization

### Added
- **Enhanced Interactive Map**:
    - Detailed hover tooltips with Patient ID, Name, PSU Name, Area Code, Subject Group, Age, HGB, and Anemia Category
    - Village summary labels showing Total Patients and Severe Cases
    - Click-to-filter functionality: clicking village markers filters entire dashboard
    - Safety feature: Non-clickable red markers for villages with no data
- **Beneficiary Breakdown Tooltips**: Map markers display detailed beneficiary-wise breakdown for each village
- **Exact Koppal District Boundary**:
    - Replaced approximate outline with official 2011 Census boundary data
    - Created `koppal_district_official.geojson` with accurate administrative limits
    - Subtle blue shading with distinct border
- **Patient Tracking Table Enhancements**:
    - Expanded columns including new "Gender" column
    - Ordered layout: `SL.NO`, `ID`, `enrollment_date`, `Area COde`, `PSU Name`, `Name`, `Household Name`, `Gender`, `Benificiery`, `DOB`, `Age`, `sample_status`, `Sample Collected Date`, `Collected By`, `HGB`, `anemia_category`, `field_investigator`, `Diet`, `data_operator`
    - Date formatting: `DD/MM/YYYY` for `enrollment_date`, `DOB`, and `Sample Collected Date`

### Changed
- **Mobile Responsiveness**:
    - Adaptive grid system: filters stack vertically on mobile
    - Summary cards in 2-column grid on small screens
    - Charts stack vertically and resize automatically
    - Optimized font sizes and spacing for mobile devices
- **Layout Stability**: Reserved fixed vertical space for Map and Charts to prevent overlap during loading
- **Map Updates**: Automatically updates PSU dropdown when village marker clicked

---

## [v1.2.0] - 2026-01-20 - Professional UI Redesign

### Added
- **Premium Aesthetic**:
    - Custom `assets/style.css` with "Inter" typography from Google Fonts
    - Glassmorphism effect for cards
    - Professional top-borders on KPI cards, color-coded by metric
    - Polished table headers with subtle row highlights
- **Smart Age Conversion**:
    - Automatic conversion of text like "22 years 6 months" to `22.5`
    - Month support: "6 months" converts to `0.5`
    - Robust parsing with regular expressions for "yr" and "mo" labels

### Changed
- **Centered Map Layout**: Map now occupies 2/3 of main screen area as focal point
- **Stacked Distribution Charts**: Case Distribution (Pie) and Study Group Breakdown (Bar) stacked on right
- **Full-Width Comparison Chart**: "Anemia Status Comparison by Area Code" moved to full-width section below map
- **Chart Aesthetics**:
    - Converted pie chart to modern donut chart
    - Removed gridlines from bar charts
    - Consistent color palette across all visualizations
    - Soft primary blue for study group distribution

---

## [v1.1.0] - 2026-01-19 - Slate & Indigo Theme

### Added
- **Visual Theme Overhaul**:
    - Deep navy/slate sidebar for better contrast and hierarchy
    - `Inter` font family applied globally (charts and tables)
    - Color palette: Primary Indigo (#6366f1)
    - Soft background colors with matching colored icons on KPI cards
- **Enhanced Sidebar**:
    - FontAwesome icons on filter labels for quick recognition
    - Decorative icons on KPI cards (Users, Face Smile/Frown)
    - Soft shadows and refined border radiuses for modern card aesthetic
- **Chart Refinements**:
    - Clean grid with removed unnecessary lines
    - Improved axis label colors
    - Better legend positioning to avoid overlapping
    - Unified font styling in hover tooltips

---

## [v1.0.0] - 2026-01-19 - Initial Dashboard Release

### Added
- **Core Dashboard Framework**:
    - Built with Plotly Dash and Dash Bootstrap Components
    - Real-time data fetching from Google Sheets via Apps Script
    - Pandas-based data processing pipeline
- **Interactive Visualizations**:
    - Interactive map with Plotly Graph Objects
    - Case Distribution Pie Chart
    - Subject Group Breakdown Bar Chart
    - Area Code Comparison Stacked Bar Chart
- **KPI Scorecards**:
    - Total Enrolled
    - Samples Collected
    - Tests Completed
    - Average Hemoglobin
    - Anemia category counts
- **Filtering System**:
    - Area Code selection
    - PSU (village) selection
    - Beneficiary Type filter
    - Anemia Status filter
    - Clear All Filters functionality
- **Patient Tracking Table**:
    - Sortable and filterable DataTable
    - Conditional color-coding by anemia severity
    - Export to Excel and CSV functionality
- **Data Synchronization**:
    - Optimized ID-based syncing with Google Sheets
    - Smart row-level diffing: only syncs new or updated patients
    - Header-aware Apps Script for robust column mapping
    - Background sync every 60 seconds

### Technical Implementation
- **Data Source**: Google Sheets backend via Google Apps Script URL
- **Server**: Flask server with Gunicorn support
- **Port**: 8050 (later changed to 8060)
- **Responsive Design**: Bootstrap-based responsive layout
- **Custom Scrollbar**: Webkit-based custom scrollbar styling

---

*Changelog maintained from project inception (January 2026) to present*  
*Last updated: February 11, 2026*
