
import PropTypes from "prop-types";
import styles from "./Button.module.css";
/* every class from Button.module.css is imported into js object in the name of 'styles' by module : css module 
each class has unique, locally scoped name as value by create-react-app*/

    function Button({text}){
        return <button className={styles.btn}>{text}</button>
        /* this button tag take the unique value of 'btn' class as a class name 
        and the 'btn' class apply this*/
    }

Button.propTypes={
    text: PropTypes.string.isRequired,
}

export default Button;