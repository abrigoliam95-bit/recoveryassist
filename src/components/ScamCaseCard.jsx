import { useState } from 'react'

export default function ScamCaseCard({ caseData }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="case-card">
      <div className="case-card-image">
        <img src={caseData.image} alt={caseData.title} loading="lazy" />
        <span className="case-card-badge">{caseData.category}</span>
      </div>
      
      <div className="case-card-body">
        <h3 className="case-card-title">{caseData.title}</h3>
        
        <div className="case-card-meta">
          <span><strong>Location:</strong> {caseData.location}</span>
          <span><strong>Recovered:</strong> {caseData.recovered}</span>
        </div>

        <p className="case-card-summary">{caseData.summary}</p>

        {expanded && (
          <div className="case-card-details">
            <p>{caseData.details}</p>
            <div className="case-card-tip">
              <strong>🛡️ Awareness Tip:</strong> {caseData.tip}
            </div>
          </div>
        )}

        <button 
          className="case-card-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Read Full Case'}
        </button>
      </div>
    </div>
  )
}