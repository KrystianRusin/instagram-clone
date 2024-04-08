import GitHubIcon from "@mui/icons-material/GitHub";
import "./Disclaimer.css";

const Disclaimer = () => {
  return (
    <div className="disclaimer-container">
      <p className="disclaimer-text">
        This application is for demonstration purposes only and not really
        Instagram, please do not use your real login information and do not
        input/upload personal or sensitive information.
      </p>
      <p className="disclaimer-link-text">
        Created by: Krystian Rusin
        <a
          href="https://github.com/KrystianRusin/instagram-clone"
          className="disclaimer-link"
        >
          <GitHubIcon />
        </a>
      </p>
    </div>
  );
};
export default Disclaimer;
