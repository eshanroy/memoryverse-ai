function StarField() {
  const stars = Array.from({ length: 120 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white opacity-70 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default StarField;