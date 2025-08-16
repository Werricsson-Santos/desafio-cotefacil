interface PlaceholderProps {
  appName: string;
}

export const PlaceholderComponent: React.FC<PlaceholderProps> = ({ appName }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{appName}</h1>
      <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
        🚧 Esta página ainda está em construção. 🚧
      </p>
    </div>
  );
};