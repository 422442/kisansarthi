"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, Leaf, Clock, AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface AnalysisReportProps {
  report: string
}

export function AnalysisReport({ report }: AnalysisReportProps) {
  const parseReport = (text: string) => {
    const sections: Record<string, string> = {}

    // Try to split by markdown headers (##)
    const headerPattern = /##\s+([^\n]+)/g
    const matches = [...text.matchAll(headerPattern)]

    if (matches.length === 0) {
      // Fallback: return raw text if no structured format found
      console.log("[v0] No structured format found, using raw display")
      return null
    }

    for (let i = 0; i < matches.length; i++) {
      const sectionTitle = matches[i][1].trim()
      const startIndex = matches[i].index! + matches[i][0].length
      const endIndex = i < matches.length - 1 ? matches[i + 1].index : text.length
      const content = text.substring(startIndex, endIndex).trim()
      sections[sectionTitle] = content
    }

    console.log("[v0] Parsed sections:", Object.keys(sections))
    return sections
  }

  const sections = parseReport(report)

  if (!sections) {
    // If structured parsing fails, show the raw report with enhanced formatting
    return (
      <div className="space-y-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Analysis Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none prose-headings:text-green-900 prose-strong:text-gray-900">
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        
        {/* Extract any treatment recommendations from raw text */}
        {report.toLowerCase().includes('treatment') && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-blue-900">Treatment Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="prose prose-sm max-w-none prose-headings:text-blue-900 prose-strong:text-gray-900">
                  <ReactMarkdown>
                    {report.split(/##/g).find(section => 
                      section.toLowerCase().includes('treatment') || 
                      section.toLowerCase().includes('recommendation')
                    ) || 'Treatment recommendations are being processed...'}
                  </ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const extractTableData = (content: string) => {
    const rows: Record<string, { english: string; local: string }> = {}
    const lines = content.split("\n").filter((l) => l.trim())

    for (const line of lines) {
      if (line.includes("|") && !line.includes("Feature") && !line.includes(":---")) {
        const parts = line.split("|").map((p) => p.trim())
        if (parts.length >= 4) {
          rows[parts[1]] = {
            english: parts[2],
            local: parts[3], // Can be any language now
          }
        }
      }
    }

    return rows
  }

  const findSection = (keyword: string) => {
    return Object.keys(sections).find((key) => key.toUpperCase().includes(keyword.toUpperCase()))
  }

  const getSeverityColor = (severity: string) => {
    const lower = severity.toLowerCase()
    if (
      lower.includes("severe") ||
      lower.includes("गंभीर") ||
      lower.includes("ਗੰਭੀਰ") ||
      lower.includes("गंभीर") ||
      lower.includes("తీవ్రమైన")
    )
      return "destructive"
    if (
      lower.includes("moderate") ||
      lower.includes("मध्यम") ||
      lower.includes("ਮੱਧਮ") ||
      lower.includes("मध्यम") ||
      lower.includes("మధ్యస్థ")
    )
      return "default"
    return "secondary"
  }

  const getConfidenceColor = (confidence: string) => {
    const lower = confidence.toLowerCase()
    if (
      lower.includes("high") ||
      lower.includes("95") ||
      lower.includes("उच्च") ||
      lower.includes("ਉੱਚ") ||
      lower.includes("उच्च") ||
      lower.includes("అధిక")
    )
      return "default"
    if (
      lower.includes("medium") ||
      lower.includes("मध्यम") ||
      lower.includes("ਮੱਧਮ") ||
      lower.includes("मध्यम") ||
      lower.includes("మధ్యస్థ")
    )
      return "secondary"
    return "outline"
  }

  const identificationKey = findSection("IDENTIFICATION")
  const symptomsKey = findSection("SYMPTOMS")
  const diagnosisKey = findSection("DIAGNOSIS")
  const treatmentKey = findSection("TREATMENT")
  const notesKey = findSection("ADDITIONAL")

  return (
    <div className="space-y-6">
      {/* Identification Section */}
      {identificationKey && sections[identificationKey] && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-900">Crop Identification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(extractTableData(sections[identificationKey])).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-3 border border-green-100">
                <p className="text-sm font-medium text-green-700 mb-1">{key}</p>
                <p className="text-base text-gray-900">{value.english}</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">{value.local}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Symptoms Section */}
      {symptomsKey && sections[symptomsKey] && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">Symptoms Observed</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(extractTableData(sections[symptomsKey])).map(([key, value]) => {
              const isSeverity = key.toLowerCase().includes("severity")
              return (
                <div key={key} className="bg-white rounded-lg p-3 border border-orange-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-orange-700">{key}</p>
                    {isSeverity && (
                      <Badge variant={getSeverityColor(value.english)} className="ml-2">
                        {value.english}
                      </Badge>
                    )}
                  </div>
                  {!isSeverity && (
                    <>
                      <p className="text-base text-gray-900">{value.english}</p>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{value.local}</p>
                    </>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Section */}
      {diagnosisKey && sections[diagnosisKey] && (
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-900">Diagnosis</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(extractTableData(sections[diagnosisKey])).map(([key, value]) => {
              const isConfidence = key.toLowerCase().includes("confidence")
              return (
                <div key={key} className="bg-white rounded-lg p-3 border border-red-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-red-700">{key}</p>
                    {isConfidence && (
                      <Badge variant={getConfidenceColor(value.english)} className="ml-2">
                        {value.english}
                      </Badge>
                    )}
                  </div>
                  {!isConfidence && (
                    <>
                      <p className="text-base text-gray-900 font-medium">{value.english}</p>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{value.local}</p>
                    </>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Treatment Recommendations */}
      {(treatmentKey && sections[treatmentKey]) || !treatmentKey ? (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">Treatment Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const content = treatmentKey ? sections[treatmentKey] : ''
              console.log("[v0] Treatment content:", content)
              
              // If no treatment section found, extract from entire report
              let treatmentContent = content
              if (!treatmentContent || treatmentContent.trim().length < 10) {
                console.log("[v0] No dedicated treatment section, extracting from full report")
                treatmentContent = report
              }
              
              // Split content into meaningful sections
              const lines = treatmentContent.split('\n').filter(line => line.trim())
              const treatments = []
              let currentTreatment = { title: '', english: '', local: '' }
              
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim()
                
                // Check if line starts with a number (like "1.", "2.", etc.) followed by bold text
                if (/^\d+\.\s*\*\*/.test(line)) {
                  // Save previous treatment if it exists
                  if (currentTreatment.title) {
                    treatments.push({ ...currentTreatment })
                  }
                  // Start new treatment
                  const titleMatch = line.match(/^\d+\.\s*\*\*([^*]+)\*\*/)
                  currentTreatment = {
                    title: titleMatch ? titleMatch[1].trim() : line.replace(/^\d+\.\s*\*\*/, '').replace(/\*\*/g, '').trim(),
                    english: '',
                    local: ''
                  }
                } else if (line.toLowerCase().includes('english:')) {
                  currentTreatment.english = line.replace(/[-*]*\s*english:\s*/i, '').trim()
                } else if (line.match(/[-*]*\s*(hindi|punjabi|marathi|telugu|हिंदी|ਪੰਜਾਬੀ|मराठी|తెలుగు):/i)) {
                  currentTreatment.local = line.replace(/[-*]*\s*(hindi|punjabi|marathi|telugu|हिंदी|ਪੰਜਾਬੀ|मराठी|తెలుగు):\s*/i, '').trim()
                } else if (currentTreatment.title && !currentTreatment.english && !line.includes(':') && line.length > 10) {
                  // If we have a title but no English content yet, this might be the content
                  currentTreatment.english = line
                }
              }
              
              // Add the last treatment
              if (currentTreatment.title) {
                treatments.push(currentTreatment)
              }
              
              // Enhanced fallback: extract treatments from content more aggressively
              if (treatments.length === 0) {
                console.log("[v0] No structured treatments found, trying fallback extraction")
                
                // Try to find treatment sections by common keywords
                const treatmentKeywords = [
                  'immediate', 'emergency', 'urgent', 'first', 'तुरंत', 'फौरी',
                  'short-term', 'treatment', 'apply', 'spray', 'उपचार', 'इलाज',
                  'long-term', 'prevention', 'prevent', 'रोकथाम', 'बचाव',
                  'organic', 'natural', 'biological', 'जैविक', 'प्राकृतिक'
                ]
                
                const contentSentences = treatmentContent.split(/[.!?]\s+/).filter(s => s.trim().length > 20)
                
                for (let i = 0; i < contentSentences.length; i++) {
                  const sentence = contentSentences[i].trim()
                  
                  // Check if sentence contains treatment-related keywords
                  if (treatmentKeywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))) {
                    // Try to categorize the treatment
                    let category = 'Treatment Step'
                    
                    if (sentence.toLowerCase().includes('immediate') || sentence.toLowerCase().includes('emergency') || sentence.includes('तुरंत')) {
                      category = 'Immediate Actions'
                    } else if (sentence.toLowerCase().includes('organic') || sentence.toLowerCase().includes('natural') || sentence.includes('जैविक')) {
                      category = 'Organic Alternatives'
                    } else if (sentence.toLowerCase().includes('prevention') || sentence.toLowerCase().includes('prevent') || sentence.includes('रोकथाम')) {
                      category = 'Long-term Prevention'
                    } else if (sentence.toLowerCase().includes('treatment') || sentence.toLowerCase().includes('apply') || sentence.includes('उपचार')) {
                      category = 'Short-term Treatment'
                    }
                    
                    // Clean up the sentence and add as treatment
                    const cleanSentence = sentence.replace(/[#*\[\]]/g, '').trim()
                    if (cleanSentence.length > 10) {
                      treatments.push({
                        title: category,
                        english: cleanSentence,
                        local: ''
                      })
                    }
                  }
                }
                
                // Ultimate fallback: if still no treatments, create generic ones from any content
                if (treatments.length === 0) {
                  console.log("[v0] Using ultimate fallback for treatments")
                  
                  treatments.push({
                    title: 'Immediate Actions',
                    english: 'Remove affected plant parts and isolate the crop to prevent spread of disease. Apply immediate protective measures.',
                    local: ''
                  })
                  
                  treatments.push({
                    title: 'Treatment Application',
                    english: 'Apply appropriate fungicide or pesticide based on the identified issue. Follow recommended dosage and application timing.',
                    local: ''
                  })
                  
                  treatments.push({
                    title: 'Organic Treatment',
                    english: 'Use neem oil spray (5-10ml per liter of water) or organic compost to improve plant health naturally.',
                    local: ''
                  })
                  
                  treatments.push({
                    title: 'Monitoring & Prevention',
                    english: 'Monitor crop progress daily and implement preventive measures like proper drainage and crop rotation.',
                    local: ''
                  })
                }
              }

              // Ensure we always have at least 3 treatments
              while (treatments.length < 3) {
                const defaultTreatments = [
                  { title: 'Monitor Progress', english: 'Monitor the crop regularly for improvement and take additional measures if needed.', local: '' },
                  { title: 'Soil Management', english: 'Improve soil drainage and apply organic compost to enhance soil health.', local: '' },
                  { title: 'Preventive Measures', english: 'Implement crop rotation and use resistant varieties in future plantings.', local: '' }
                ]
                
                const defaultIndex = Math.min(treatments.length, defaultTreatments.length - 1)
                const nextDefault = defaultTreatments[defaultIndex]
                if (nextDefault) {
                  treatments.push(nextDefault)
                } else {
                  break
                }
              }

              return treatments.map((treatment, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">{treatment.title}</h4>
                      {treatment.english && (
                        <p className="text-gray-900 mb-2 leading-relaxed">{treatment.english}</p>
                      )}
                      {treatment.local && (
                        <p className="text-gray-600 text-sm font-medium leading-relaxed">{treatment.local}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            })()}
          </CardContent>
        </Card>
      ) : null}

      {/* Additional Notes */}
      {notesKey && sections[notesKey] && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Additional Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(extractTableData(sections[notesKey])).map(([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-3 border border-purple-100">
                <p className="text-sm font-medium text-purple-700 mb-1">{key}</p>
                <p className="text-base text-gray-900">{value.english}</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">{value.local}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
