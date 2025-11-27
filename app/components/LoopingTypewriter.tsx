import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoopingTypewriterProps {
    texts: string[]; // Array of strings to cycle through and type out
    typingSpeed?: number; // Speed of typing in ms per character
    deletingSpeed?: number; // Speed of deleting in ms per character
    delayBeforeTyping?: number; // Delay before typing starts
    delayBeforeDeleting?: number; // Delay before deleting starts
    delayBetweenLoops?: number; // Delay between full loops
    className?: string; // Additional CSS classes for the component
}

const LoopingTypewriter: React.FC<LoopingTypewriterProps> = ({
    texts,
    typingSpeed = 70,
    deletingSpeed = 30,
    delayBeforeTyping = 1000,
    delayBeforeDeleting = 2000,
    delayBetweenLoops = 1000,
    className = '',
}) => {
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleTyping = () => {
            const fullText = texts[textIndex];
            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                    timeoutId = setTimeout(handleTyping, delayBetweenLoops);
                } else {
                    timeoutId = setTimeout(handleTyping, deletingSpeed);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText.length === fullText.length) {
                    timeoutId = setTimeout(() => setIsDeleting(true), delayBeforeDeleting);
                } else {
                    timeoutId = setTimeout(handleTyping, typingSpeed);
                }
            }
        };

        // Initial delay before first typing starts
        timeoutId = setTimeout(handleTyping, delayBeforeTyping);

        return () => clearTimeout(timeoutId);
    }, [
        currentText,
        isDeleting,
        textIndex,
        texts,
        typingSpeed,
        deletingSpeed,
        delayBeforeTyping,
        delayBeforeDeleting,
        delayBetweenLoops,
    ]);

    return (
        <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {currentText}
            <motion.span
                className="inline-block w-0.5 h-full bg-green-400 align-text-bottom ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
        </motion.span>
    );
};

export default LoopingTypewriter;