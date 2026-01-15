export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀🚀</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>Alright! that's everything, we're ready to go.</em>
      ) : (
        <em>
          You have {numItems} items on your list and you've already packed{' '}
          {numPacked} ({percentage}%) of the total
        </em>
      )}
    </footer>
  );
}
