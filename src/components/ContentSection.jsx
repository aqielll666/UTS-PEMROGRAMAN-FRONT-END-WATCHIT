import React from 'react';
import { motion } from 'framer-motion';
import ContentCard from '@/components/ContentCard';

const ContentSection = ({ title, content }) => {
  return (
    <section className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-white mb-6"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {content.map((item, index) => (
          <ContentCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;