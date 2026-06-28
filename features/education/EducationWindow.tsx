'use client'
import { motion } from 'framer-motion'
import { EDUCATION } from '@/data/portfolio'
import { Calendar, BookOpen, Award, CheckCircle, Star } from 'lucide-react'

export default function EducationWindow() {
  const edu = EDUCATION[0] // Since there is only one education block (FPT University)

  return (
    <div style={{
      padding: 24,
      fontFamily: 'var(--font-ui)',
      height: '100%',
      overflowY: 'auto',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      <div className="edu-container" style={{
        display: 'flex',
        gap: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {/* Left Card: Logo & Primary Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            flex: '1 1 280px',
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* FPT University Logo Container */}
          <div style={{
            width: 140,
            height: 140,
            borderRadius: 20,
            background: '#ffffff',
            padding: 16,
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
            border: '1px solid var(--window-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            position: 'relative',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fpt_logo.svg"
              alt="FPT University Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: '0 0 6px 0',
            letterSpacing: '-0.3px',
          }}>
            {edu.institution}
          </h3>

          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            margin: '0 0 4px 0',
          }}>
            {edu.degree}
          </p>

          <p style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--orange-vivid)',
            margin: '0 0 16px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            {edu.field}
          </p>

          {/* Timeline & GPA Badges */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            borderTop: '1px solid var(--window-border)',
            paddingTop: 16,
          }}>
            {/* Timeline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 13.5,
              color: 'var(--text-secondary)',
            }}>
              <Calendar size={14} color="var(--orange-vivid)" />
              <span style={{ fontWeight: 600 }}>{edu.period}</span>
            </div>

            {/* GPA Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: 'var(--gold-soft)',
              border: '1px solid #fde68a',
              borderRadius: 12,
              padding: '8px 16px',
              width: 'fit-content',
              margin: '4px auto 0 auto',
            }}>
              <Star size={14} color="var(--gold)" fill="var(--gold)" />
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)' }}>
                GPA: {edu.gpa}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Activities, Focus Areas & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            flex: '2 1 400px',
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Section: Academic Activities & Leadership */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Award size={16} color="var(--orange-vivid)" />
              <h3 style={{
                fontSize: 12,
                fontWeight: 800,
                color: 'var(--orange-vivid)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: 0,
              }}>
                Activities & Leadership
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {edu.activities?.map((act, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--window-border)',
                    fontSize: 13.5,
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle size={14} color="var(--orange-vivid)" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Key Focus Areas */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <BookOpen size={16} color="var(--blue-vivid)" />
              <h3 style={{
                fontSize: 12,
                fontWeight: 800,
                color: 'var(--blue-vivid)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: 0,
              }}>
                Key Areas of Focus
              </h3>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {[
                'Digital Marketing Strategy',
                'SEO & Content Optimization',
                'Social Media Management',
                'Market Research & Insights',
                'Event Organizing & Branding',
                'Creative Problem Solving',
              ].map((focus, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: 'var(--blue-soft)',
                    border: '1px solid var(--blue-bright)',
                    fontSize: 12.5,
                    color: 'var(--blue-vivid)',
                    fontWeight: 600,
                  }}
                >
                  {focus}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS Styles for responsive stacking */}
      <style>{`
        @media (max-width: 768px) {
          .edu-container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}
