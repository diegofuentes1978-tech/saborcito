
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.search}>
      <span>🔎</span>

      <input
        type="text"
        placeholder="¿Qué te gustaría cocinar hoy?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
