import React, { FormEvent, ChangeEvent, useState } from 'react';

import styles from './Components.module.css';

interface IDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const JokeCategory = (props: IDropdownProps): JSX.Element => {
  const { categories, onCategorySelect, selectedCategory } = props;
  const [category, setCategory] = useState(selectedCategory);

  const handleCategoryChange = (changeEvent: ChangeEvent<HTMLSelectElement>): void => {
    setCategory(changeEvent.target.value);
    changeEvent.preventDefault();
  };

  const handleCategorySubmit = (submitEvent: FormEvent<HTMLFormElement>): void => {
    onCategorySelect(category);
    submitEvent.preventDefault();
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleCategorySubmit}>
        <label className={styles.infoText}>
          Pick your joke category:
          <select className={styles.categoryDropdown} value={category} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <input type='submit' value='Submit' className={styles.button} />
      </form>
      <p className={styles.infoText}>Currently selected joke category: {selectedCategory}</p>
    </section>
  );
};
