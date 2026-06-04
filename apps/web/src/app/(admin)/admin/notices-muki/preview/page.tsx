'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { MukiLaborPreview } from '../_components/MukiLaborPreview';
import type { CompanyInfo } from '../../notices/_components/OfferPreview';

const sample = {
  person: '', laborDate: '', convertDate: '', workplace: '', workplaceRange: '',
  jobDesc: '', jobRange: '', startTime: '', endTime: '', breakTime: '',
  workTimeSystem: '' as string, overtime: '', holidays: '', leave: '',
  salary: '', fixedOvertime: '', jobAllowance: '', salaryTotal: '',
  commutePay: '', payClose: '', payDay: '', raise: '', bonus: '',
  severance: '', insurance: '',
};

export default function AdminNoticesMukiPreviewPage() {
  const router = useRouter();
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
          #muki-preview-body, #muki-preview-body * { visibility: visible; }
          #muki-preview-body { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          tr { break-inside: avoid; page-break-inside: avoid; }
          .print-page-2 { break-before: page !important; page-break-before: always !important; }
          #muki-preview-body > div { border: none !important; box-shadow: none !important; }
        }
      `}</style>

      <div className="flex justify-between items-center mb-5 flex-wrap gap-2 no-print">
        <h1 className="text-2xl font-medium">通知書プレビュー（無期転換）</h1>
        <div className="flex items-center gap-2">
          <button className="btn-outline text-sm py-2" onClick={() => router.push('/admin/notices-muki/new')}>
            編集に戻る
          </button>
          <button className="btn-primary text-sm py-2" onClick={() => window.print()}>
            PDFダウンロード
          </button>
        </div>
      </div>

      <div id="muki-preview-body" style={{ maxWidth: 800, margin: '0 auto' }}>
        <MukiLaborPreview {...sample} companyInfo={companyInfo} />
      </div>
    </div>
  );
}
