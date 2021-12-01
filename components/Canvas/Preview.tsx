import { observer } from 'mobx-react-lite'
import { motion, AnimatePresence } from 'framer-motion'
import { store } from 'data'

export const Preview = observer(() => {
  const { slug } = store.editorStore
  return (
    <AnimatePresence>
      {true && (
        <motion.div
          key={0}
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            transform: 'scale(0.5)',
            position: 'absolute',
            zIndex: 2,
          }}>
          <img
            src={`https://sdqycteblanimltlbiss.supabase.in/storage/v1/object/public/template-thumbnails/${slug}.png`}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
})
