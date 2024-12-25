import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isLoading }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={isLoading}>
      {isLoading ? <span className="spinner"></span> : "Load more"}
    </button>
  );
};

export default LoadMoreBtn;
