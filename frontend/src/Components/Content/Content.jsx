import  "./Content.scss"

// eslint-disable-next-line react/prop-types
export default function Content({ children }) {
  return (
    <main className="content">
      {children}
    </main>
  );
}