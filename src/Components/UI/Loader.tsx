const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#8b5c3d]" />
    </div>
  );
};

export default Loader;
