import type { CompanyInfo } from './OfferPreview';

export type { CompanyInfo };

export interface LaborPreviewProps {
  date: string;
  person: string;
  contractTerm: string;
  contractRange: string;
  workplace: string;
  workplaceRange: string;
  jobDesc: string;
  jobRange: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  overtime: string;
  holidays: string;
  leave: string;
  salaryBase: string;
  fixedOvertime: string;
  jobAllowance: string;
  salaryTotal: string;
  commute: string;
  payclose: string;
  payday: string;
  raise: string;
  bonus: string;
  severance: string;
  insurance: string;
  companyInfo: CompanyInfo | null;
  representative?: string;
}

const pageCls = 'bg-white border border-border p-12 min-h-[1050px] print:min-h-0 print:border-0 print:shadow-none mb-6 shadow-sm';
const serifCls = 'font-serif text-sm leading-[2] text-[#1A1A1A]';
const thCls = 'border border-[#555] px-2.5 py-2 text-xs font-medium bg-[#f5f5f0] w-[100px] align-top leading-[1.7]';
const tdCls = 'border border-[#555] px-2.5 py-2 text-xs align-top leading-[1.7] break-words';

export function LaborPreview(props: LaborPreviewProps) {
  const { companyInfo } = props;
  const companyAddress = [companyInfo?.address1, companyInfo?.address2].filter(Boolean).join(' ');
  return (
    <>
      {/* page 1 */}
      <div className={`${pageCls} ${serifCls}`} style={{ lineHeight: 1.7 }}>
        <div className="text-right text-[11px] text-secondary mb-1">
          （一般労働者用；常用、有期雇用型）
        </div>
        <div className="text-center text-xl font-semibold tracking-[0.15em] mb-5">
          労働条件通知書
        </div>
        <div className="mb-1 text-[13px]">{props.date}</div>
        <div className="mb-3 text-[13px]">{props.person}　殿</div>
        <div className="text-right mb-5 text-xs leading-[1.8]">
          事業場名称・所在地　{companyInfo?.name || ''}
          <br />
          {companyAddress}
          <br />
          使用者職氏名　代表取締役　{props.representative || ''}
        </div>

        <table className="w-full border-collapse table-fixed">
          <tbody>
            <tr>
              <td className={thCls}>契約期間</td>
              <td className={tdCls}>
                {props.contractTerm}（{props.contractRange}）
                <br /><br />
                <span className="text-[11px] text-secondary">
                  ※以下は、「契約期間」について「期間の定めあり」とした場合に記入
                </span>
                <br /><br />
                １　契約の更新の有無
                <br />
                　[　自動的に更新する　◯更新する場合があり得る　契約の更新はしない　その他　]
                <br /><br />
                ２　契約の更新は次により判断する。
                <br />
                　　◯契約期間満了時の業務量　◯勤務成績、態度　◯能力、体力、知力
                <br />
                　　◯会社の経営状況　◯従事している業務の進捗状況
                <br /><br />
                ３　更新上限の有無（無）
              </td>
            </tr>
            <tr>
              <td className={thCls}></td>
              <td className={tdCls}>
                <span className="text-[11px]">
                  【労働契約法に定める同一の企業との間での通算契約期間が５年を超える有期労働契約の締結の場合】
                  <br />
                  本契約期間中に会社に対して期間の定めのない労働契約（無期労働契約）の
                  <br />
                  締結の申込みをすることにより、本契約期間の末日の翌日から、
                  <br />
                  無期労働契約での雇用に転換することができる。
                  <br />
                  この場合の本契約からの労働条件の変更の有無（◯無　・　有（別紙のとおり））
                </span>
              </td>
            </tr>
            <tr>
              <td className={thCls}></td>
              <td className={tdCls}>
                <span className="text-[11px]">
                  【有期雇用特別措置法による特例の対象者の場合】
                  <br />
                  無期転換申込権が発生しない期間：　Ⅰ（高度専門）・Ⅱ（定年後の高齢者）
                  <br />
                  Ⅰ　特定有期業務の開始から完了までの期間（　年　　か月（上限10年））
                  <br />
                  Ⅱ　定年後引き続いて雇用されている期間
                </span>
              </td>
            </tr>
            <tr>
              <td className={thCls}>就業の場所</td>
              <td className={tdCls}>（雇入れ直後）{props.workplace}</td>
            </tr>
            <tr>
              <td className={thCls}>従事すべき<br />業務の内容</td>
              <td className={tdCls}>（雇入れ直後）{props.jobDesc}</td>
            </tr>
            <tr>
              <td className={thCls}>
                始業、終業の<br />時刻、休憩時間、<br />所定時間外労働<br />の有無
              </td>
              <td className={tdCls}>
                １　始業・終業の時刻等
                <br />
                ◯(1) 始業（{props.startTime}）　終業（{props.endTime}）※勤務先による
                <br /><br />
                　【以下のような制度が労働者に適用される場合】
                <br />
                　(2) 変形労働時間制等；（　　）単位の変形労働時間制・交替制
                <br />
                　(3) ﾌﾚｯｸｽﾀｲﾑ制；始業及び終業の時刻は労働者の決定に委ねる。
                <br />
                　(4) 事業場外みなし労働時間制
                <br />
                　(5) 裁量労働制
                <br /><br />
                ２　休憩時間（{props.breakTime}）
                <br /><br />
                ３　所定時間外労働の有無（{props.overtime}）
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-4 text-xs text-secondary">（次頁に続く）</div>
      </div>

      {/* page 2 */}
      <div className={`${pageCls} ${serifCls} print-page-2`} style={{ lineHeight: 1.7 }}>
        <table className="w-full border-collapse table-fixed">
          <tbody>
            <tr>
              <td className={thCls}>休日</td>
              <td className={tdCls}>・{props.holidays}</td>
            </tr>
            <tr>
              <td className={thCls}>休暇</td>
              <td className={tdCls}>
                １　年次有給休暇　{props.leave}
                <br />
                　　　継続勤務６か月以内の年次有給休暇（有・無）
                <br />
                　　　時間単位年休（有・無）
                <br />
                ２　代替休暇（有・無）
                <br />
                ３　その他の休暇　有給（　　　　　　　　）
                <br />
                　　　　　　　　　無給（　　　　　　　　）
              </td>
            </tr>
            <tr>
              <td className={thCls}>賃金</td>
              <td className={tdCls}>
                １　給与
                <br />
                　　基本給　{props.salaryBase}円
                <br />
                　　固定残業代　{props.fixedOvertime}円
                <br />
                　　職務手当　{props.jobAllowance}円
                <br />
                　　<span className="font-semibold">合計　{props.salaryTotal}円</span>
                <br /><br />
                ２　通勤手当：{props.commute}
                <br /><br />
                ３　月単位での時間外割増し、深夜割増しおよび法定休日割増し支給。
                <br />
                　　手当額を超過する場合は、超過分を別途支給。
                <br /><br />
                ４　賃金締切日　{props.payclose}
                <br />
                ５　賃金支払日　{props.payday}
                <br />
                ６　賃金の支払方法（銀行振込）
                <br /><br />
                ７　昇給（{props.raise}）
                <br />
                ８　賞与（{props.bonus}）
                <br />
                ９　退職金（{props.severance}）
              </td>
            </tr>
            <tr>
              <td className={thCls}>退職に関する<br />事項</td>
              <td className={tdCls}>
                １　定年制（有（60歳），無）
                <br />
                ２　継続雇用制度（有（65歳まで），無）
                <br />
                ３　自己都合退職の手続（退職する14日以上前に届け出ること）
                <br />
                ４　解雇の事由及び手続
              </td>
            </tr>
            <tr>
              <td className={thCls}>その他</td>
              <td className={tdCls}>
                ・社会保険の加入状況（{props.insurance}）
                <br />
                ・雇用保険の適用（有）
                <br />
                ・その他（　　　　　　　　　　　　　　　　　　　　　　　　）
              </td>
            </tr>
            <tr>
              <td className={thCls}></td>
              <td className={tdCls}>
                以上のほかは、当社就業規則による。
                <br />
                就業規則を確認できる場所や方法（事務所内書庫および従業員システム）
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-[10.5px] text-secondary leading-[1.7]">
          ※　本通知書の交付は、労働基準法第１５条に基づく労働条件の明示及び短時間労働者及び有期雇用労働者の雇用管理の改善等に関する法律（パートタイム・有期雇用労働法）第６条に基づく文書の交付を兼ねるものであること。
          <br />
          ※　労働条件通知書については、労使間の紛争の未然防止のため、保存しておくことをお勧めします。
        </div>
      </div>
    </>
  );
}
