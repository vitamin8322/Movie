import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import { RoutePaths } from "@/router";
import TextDefault from "@/components/Text/Text";
import Button from "@/components/Button/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TextDefault type="R25" color="primary" className={styles.title}>
          404
        </TextDefault>
        <TextDefault type="R18" color="white" className={styles.subtitle}>
          Oops! Page Not Found
        </TextDefault>
        <TextDefault type="R12" color="medium-gray" className={styles.message}>
          It looks like you've wandered off into the world of movies. Don't worry,
          head back to the homepage to explore more amazing films!
        </TextDefault>
        <Button
          variant="primary"
          size="medium"
          onClick={() => navigate(RoutePaths.HOME)}
          className={styles.button}
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;