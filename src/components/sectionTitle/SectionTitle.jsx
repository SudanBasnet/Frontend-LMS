import style from "./sectionTitle.module.css";
import { Link } from "react-router-dom";

const SectionTitle = ({ title, eyebrow, linkText }) => {
  return (
    <div className={style.titleContainer}>
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      <div className={style.line} />
      {linkText && <Link to="/all-books">{linkText} &rarr;</Link>}
    </div>
  );
};

export default SectionTitle;
