export interface CompanyInfo {
  name: string;
  postalCode: string;
  address1: string;
  address2: string;
}

export interface OfferPreviewProps {
  date: string;
  person: string;
  joinDate: string;
  workplace: string;
  salary: string;
  transport: string;
  trial: string;
  deadline: string;
  cancelReasons: string[];
  requiredDocs: string;
  companyInfo: CompanyInfo | null;
}

const pageCls = 'bg-white border border-border p-12 min-h-[1050px] print:min-h-0 print:border-0 print:shadow-none mb-6 shadow-sm';
const serifCls = 'font-serif text-sm leading-[2] text-[#1A1A1A]';

export function OfferPreview(props: OfferPreviewProps) {
  const { companyInfo, cancelReasons } = props;
  const companyAddress = [companyInfo?.address1, companyInfo?.address2].filter(Boolean).join(' ');
  return (
    <div className={`${pageCls} ${serifCls}`}>
      <div className="text-right">{props.date}</div>
      <div className="my-6">{props.person}　様</div>
      <div className="text-right my-5">
        {companyInfo?.name || ''}
        <br />
        <span className="text-xs">{companyAddress}</span>
      </div>
      <div className="text-center text-lg font-semibold tracking-[0.2em] my-10">
        採用内定通知書
      </div>
      <p>拝啓、時下ますますご清栄のこととお慶び申し上げます。</p>
      <p>さて、この度は弊社採用面接にご応募いただきまして、誠にありがとうございました。</p>
      <p>選考の結果、貴殿を採用内定とすることに決定いたしましたので、ご通知申し上げます。</p>
      <p>
        つきましては、下記の内容をご確認いただき、
        <span className="font-semibold">{props.deadline}</span>
        までにメール、またはチャットツールにてご回答ください。
      </p>
      <div className="text-right my-4">敬具</div>
      <div className="text-center my-8">記</div>
      <div className="ml-12">
        <div>入社日：{props.joinDate}（予定日）</div>
        <div>就業場所：{props.workplace}</div>
        <div>給与額：月額{props.salary}円</div>
        <div>交通費：{props.transport}</div>
        <div>試用期間：{props.trial}</div>
      </div>

      <div className="mt-7 text-[13px]">
        <div className="font-semibold mb-2">内定取消事由</div>
        <div className="ml-4">以下のいずれかに該当する場合、採用内定を取り消すことがあります。</div>
        <div className="ml-8 mt-1 whitespace-pre-line">
          {cancelReasons.map((r, i) => (
            <div key={i}>{i + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-[13px]">
        <div className="font-semibold mb-2">入社時提出書類</div>
        <div className="ml-4">入社日までに以下の書類をご提出ください。</div>
        <div className="ml-8 mt-1">{props.requiredDocs}</div>
      </div>

      <div className="text-right mt-6">以上</div>
    </div>
  );
}
