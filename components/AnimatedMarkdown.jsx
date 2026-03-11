"use client";

import React, { useEffect, useState, useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "motion/react";

/**
 * AnimatedMarkdown - Renderiza markdown con un efecto de máquina de escribir 
 * o fade-in por palabras a medida que el texto se actualiza (streaming).
 */
export function AnimatedMarkdown({ content = "", className = "" }) {
  // Cuando el texto está goteando (streaming), queremos animar la entrada.
  // Separamos el string en tokens por espacios para animar cada palabra de forma independiente.
  
  const tokens = useMemo(() => {
    // Si queremos un fade muy sutil y suave, podemos procesar por "chunks" 
    // pero React Markdown procesa todo del tirón. 
    // Una forma elegante de animarlo es hacer un efecto donde los nodos se van
    // renderizando. Dado que content es markdown y parsearlo palabra por palabra 
    // rompería la sintaxis, usaremos el renderizador nativo de react-markdown
    // y aplicaremos una transición global de layout o un simple fade-in 
    // a los bloques de contenido nuevo, o un "reveal" usando CSS en todo el contenedor.
    return content;
  }, [content]);

  // Si usamos fremar-motion en el wrapper, suavizaremos los reflows:
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`prose prose-sm sm:prose-base dark:prose-invert max-w-none ${className}`}
    >
      <div className="markdown-fade-in-container">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </motion.div>
  );
}
