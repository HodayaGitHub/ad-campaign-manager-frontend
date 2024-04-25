export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <h5>
                Developed by Hodaya Ovadia &copy; {currentYear}
            </h5>
        </footer>
    );
}
