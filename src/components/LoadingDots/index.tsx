import styles from "./loading.module.css";

const LoadingDots = ({ color = "#000" }: { color?: string }) => {
    return (
        <span className={styles.loading}>
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    );
};

export default LoadingDots;