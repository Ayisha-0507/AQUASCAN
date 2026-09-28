export interface PinData {
  id: string
  lat: number
  lng: number
  classification: string
  risk: 'HIGH' | 'MEDIUM' | 'LOW'
  confidence: number
  color: 'red' | 'amber' | 'green'
}

export const demoPins: PinData[] = [
  { id: 'DEB-001', lat: 15.35, lng: 73.42, classification: 'GHOST GEAR', risk: 'HIGH', confidence: 92, color: 'red' },
  { id: 'DEB-002', lat: 15.52, lng: 73.61, classification: 'PLASTIC DEBRIS', risk: 'MEDIUM', confidence: 78, color: 'amber' },
  { id: 'DEB-003', lat: 15.18, lng: 73.28, classification: 'FISHING LINE', risk: 'LOW', confidence: 65, color: 'green' },
  { id: 'DEB-004', lat: 15.62, lng: 73.75, classification: 'METAL FRAGMENT', risk: 'HIGH', confidence: 88, color: 'red' },
  { id: 'DEB-005', lat: 15.28, lng: 73.52, classification: 'RUBBER TYRE', risk: 'MEDIUM', confidence: 71, color: 'amber' },
  { id: 'DEB-006', lat: 15.44, lng: 73.34, classification: 'WOOD WRECK', risk: 'LOW', confidence: 59, color: 'green' },
  { id: 'DEB-007', lat: 15.58, lng: 73.49, classification: 'GHOST GEAR', risk: 'HIGH', confidence: 85, color: 'red' },
]

export const surveyPath: [number, number][] = demoPins.map(p => [p.lat, p.lng])

export const auvFleet = [
  { id: 'AUV01', status: 'SURVEYING', dot: 'g', battery: 78, storage: 64 },
  { id: 'AUV02', status: 'DEPLOYED', dot: 'a', battery: 0, storage: 0 },
  { id: 'AUV03', status: 'CHARGING', dot: 'y', battery: 0, storage: 0 },
]

export const inventory = [
  { label: 'TOTAL DETECTED', value: '2,450', color: 'var(--accent)' },
  { label: 'HIGH RISK HAZARDS', value: '120', color: 'var(--red)' },
  { label: 'GHOST GEAR TARGETS', value: '850', color: 'var(--amber)' },
  { label: 'FALSE POSITIVES', value: '350', color: 'var(--text-dim)' },
]

export const activeObject = {
  id: 'DEB-001',
  classification: 'GHOST GEAR',
  risk: 'High',
  confidence: 92,
  reasoning: [
    'YOLOv8 Detection: Linear net pattern matched net template (91%).',
    'Shadow-to-Height: Shadow ratio confirms 1.2m height, differentiating from seabed rocks.',
  ],
  impact: [
    { icon: 'ok', text: 'Environmental: Ghost Gear Recovery', color: 'green' },
    { icon: 'warn', text: 'Economic: Vessel Propeller Hazard prevented.', color: 'amber' },
  ],
  sources: [
    { k: 'AUV Source', v: 'AUV01' },
    { k: 'Timestamp', v: '2026-09-25 00:28:14Z' },
    { k: 'Lat / Lon', v: '15.350° N · 73.420° E' },
    { k: 'Depth', v: '42.6 m' },
  ],
  verified: 'VERIFIED METSOURCES (INCOIS Data Stream)',
  estHeight: '0.61 m',
}
