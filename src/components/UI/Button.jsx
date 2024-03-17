export default function Button({ children, textOnly, className, ...props }) {

    const cssClasses = textOnly ? `text-button ${className}` : "button";

    return (
        <button {...props} className={cssClasses}>
            {children}
        </button>
    );
}