"use client";

export const Notes = ({ path }: { path: string }) => {
  return (
    <audio controls autoPlay>
      <source src={path} type="audio/mp4" />
      Seu navegador não suporta o elemento de áudio.
    </audio>
  );
};
