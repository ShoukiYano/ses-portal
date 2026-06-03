'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { OfferPreview } from '../_components/OfferPreview';
import { LaborPreview } from '../_components/LaborPreview';
import type { CompanyInfo } from '../_components/OfferPreview';

const sampleOffer = {
  date: '', person: '', joinDate: '', workplace: '', salary: '',
  transport: '', trial: '', deadline: '', cancelReasons: [] as string[], requiredDocs: '',
};

const sampleLabor = {
  date: '', person: '', contractTerm: '', contractRange: '', workplace: '',
  workplaceRange: '', jobDesc: '', jobRange: '', startTime: '', endTime: '',
  breakTime: '', overtime: '', holidays: '', leave: '', salaryBase: '',
  fixedOvertime: '', jobAllowance: '', salaryTotal: '', commute: '',
  payclose: '', payday: '', raise: '', bonus: '', severance: '', insurance: '',
};

export default function AdminNoticePreviewPage() {
  const router = useRouter();
  const [previewType, setPreviewType] = useState<'offer' | 'labor'>('offer');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    apiClient<CompanyInfo>('/payroll/company-info').then(setCompanyInfo).catch(() => {});
  }, []);

  return (
    <div>
      <style>{`
        @page { size: A4 portrait; margin: 15mm; }
        @media print {
          body * { visibility: hidden; }
          #notice-preview-body, #notice-preview-body * { visibility: visible; }
          #notice-preview-body { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          tr { break-inside: avoid; page-break-inside: avoid; }
          .print-page-2 { break-before: page !important; page-break-before: always !important; }
        }
      `}</style>

      <div className="flex justify-between items-center mb-5 flex-wrap gap-2 no-print">
        <h1 className="text-2xl font-medium">通知書プレビュー</h1>
        <div className="flex items-center gap-2">
          <button className="btn-outline text-sm py-2" onClick={() => router.push('/admin/notices/new')}>
            編集に戻る
          </button>
          <button className="btn-primary text-sm py-2" onClick={() => window.print()}>
            PDFダウンロード
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 no-print">
        <button
          className={`text-xs px-3 py-1.5 rounded-md border ${previewType === 'offer' ? 'bg-primary text-white border-primary' : 'border-border text-secondary'}`}
          onClick={() => setPreviewType('offer')}
        >
          採用内定通知書
        </button>
        <button
          className={`text-xs px-3 py-1.5 rounded-md border ${previewType === 'labor' ? 'bg-primary text-white border-primary' : 'border-border text-secondary'}`}
          onClick={() => setPreviewType('labor')}
        >
          労働条件通知書
        </button>
      </div>

      <div id="notice-preview-body" style={{ maxWidth: 800, margin: '0 auto' }}>
        {previewType === 'offer'
          ? <OfferPreview {...sampleOffer} companyInfo={companyInfo} />
          : <LaborPreview {...sampleLabor} companyInfo={companyInfo} />
        }
      </div>
    </div>
  );
}
