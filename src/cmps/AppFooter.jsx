export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <h5>
            This dashboard developed by Hodaya Ovadia &copy; {currentYear}
            </h5>
        </footer>
    );
}
