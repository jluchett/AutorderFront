import styles from './Skeleton.module.css';

// rows = cantidad de filas falsas, columns = cantidad de columnas
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex}>
              <div className={`${styles.skeleton} ${styles.tableCell}`}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};