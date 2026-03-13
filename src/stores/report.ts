import { create } from 'zustand'

export interface EightDReport {
  // D1: 成立团队
  d1Team: string[]
  // D2: 问题描述
  d2ProblemDescription: string
  d2ProblemOccurrence: string
  d2ProblemImpact: string
  // D3: 临时围堵措施
  d3ContainmentActions: string
  // D4: 根本原因分析
  d4PotentialCauses: string[]
  d4RootCause: string
  d4VerificationMethod: string
  // D5: 制定永久纠正措施
  d5PermanentActions: string[]
  d5ActionPlan: string
  // D6: 实施永久纠正措施
  d6ImplementationStatus: string
  d6EffectivenessVerification: string
  // D7: 预防再发生
  d7SystemicChanges: string[]
  d7DocumentationUpdates: string
  // D8: 团队祝贺
  d8TeamRecognition: string
}

interface ReportStore {
  report: Partial<EightDReport>
  updateReport: (updates: Partial<EightDReport>) => void
  resetReport: () => void
}

const initialState: Partial<EightDReport> = {
  d1Team: [],
  d2ProblemDescription: '',
  d2ProblemOccurrence: '',
  d2ProblemImpact: '',
  d3ContainmentActions: '',
  d4PotentialCauses: [],
  d4RootCause: '',
  d4VerificationMethod: '',
  d5PermanentActions: [],
  d5ActionPlan: '',
  d6ImplementationStatus: '',
  d6EffectivenessVerification: '',
  d7SystemicChanges: [],
  d7DocumentationUpdates: '',
  d8TeamRecognition: ''
}

export const useReportStore = create<ReportStore>((set) => ({
  report: { ...initialState },
  updateReport: (updates) =>
    set((state) => ({
      report: { ...state.report, ...updates }
    })),
  resetReport: () => set({ report: { ...initialState } })
}))
