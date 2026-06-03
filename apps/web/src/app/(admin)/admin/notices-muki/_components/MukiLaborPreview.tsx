import type { CompanyInfo } from '../../notices/_components/OfferPreview';

export type { CompanyInfo };

export interface MukiLaborPreviewProps {
  person: string;
  laborDate: string;
  convertDate: string;
  workplace: string;
  workplaceRange: string;
  jobDesc: string;
  jobRange: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  workTimeSystem: string;
  overtime: string;
  holidays: string;
  leave: string;
  salary: string;
  fixedOvertime: string;
  jobAllowance: string;
  salaryTotal: string;
  commutePay: string;
  payClose: string;
  payDay: string;
  raise: string;
  bonus: string;
  severance: string;
  insurance: string;
  companyInfo: CompanyInfo | null;
}

const pageStyle: React.CSSProperties = {
  background: '#fff',
  border: '0.5px solid rgba(0,0,0,0.12)',
  padding: '48px 44px',
  fontFamily: 'Yu Mincho, 游明朝, serif',
  fontSize: 13,
  lineHeight: 1.7,
  color: '#1A1A1A',
  minHeight: 1050,
  marginBottom: 24,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

const thStyle: React.CSSProperties = {
  border: '1px solid #555',
  padding: '8px 10px',
  verticalAlign: 'top',
  fontSize: 12.5,
  background: '#f5f5f0',
  fontWeight: 500,
  width: 100,
  lineHeight: 1.7,
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #555',
  padding: '8px 10px',
  verticalAlign: 'top',
  fontSize: 12.5,
  lineHeight: 1.7,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
};

function wtMark(system: string, target: string) {
  return system === target ? '◯' : '　';
}

export function MukiLaborPreview(props: MukiLaborPreviewProps) {
  const { companyInfo } = props;
  const companyAddress = [companyInfo?.address1, companyInfo?.address2].filter(Boolean).join(' ');
  return (
    <>
      {/* ===== Page 1 ===== */}
      <div style={pageStyle}>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#6B6B6B', marginBottom: 4 }}>
          （一般労働者用；常用、無期雇用型）
        </div>
        <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, letterSpacing: '0.15em', margin: '0 0 20px' }}>
          労働条件通知書
        </div>
        <div style={{ marginBottom: 4, fontSize: 13 }}>{props.laborDate}</div>
        <div style={{ marginBottom: 12, fontSize: 13 }}>{props.person}　殿</div>
        <div style={{ textAlign: 'right', marginBottom: 20, fontSize: 12, lineHeight: 1.8 }}>
          事業場名称・所在地　{companyInfo?.name || ''}
          <br />
          {companyAddress}
          <br />
          使用者職氏名
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={thStyle}>契約期間</td>
              <td style={tdStyle}>
                期間の定めなし
                <br />
                <span style={{ fontSize: 11, color: '#6B6B6B' }}>
                  ※ 無期雇用転換日：{props.convertDate}
                </span>
              </td>
            </tr>
            <tr>
              <td style={thStyle}>就業の場所</td>
              <td style={tdStyle}>
                （雇入れ直後）{props.workplace}
                <br />
                （変更の範囲）{props.workplaceRange}
              </td>
            </tr>
            <tr>
              <td style={thStyle}>従事すべき<br />業務の内容</td>
              <td style={tdStyle}>
                （雇入れ直後）{props.jobDesc}
                <br />
                （変更の範囲）{props.jobRange}
              </td>
            </tr>
            <tr>
              <td style={thStyle}>
                始業、終業の<br />時刻、休憩時間、<br />所定時間外労働<br />の有無
              </td>
              <td style={tdStyle}>
                １　始業・終業の時刻等
                <br />
                {wtMark(props.workTimeSystem, 'fixed')}(1) 始業（{props.startTime}）　終業（{props.endTime}）※勤務先による
                <br /><br />
                　【以下のような制度が労働者に適用される場合】
                <br />
                {wtMark(props.workTimeSystem, 'variable')}(2) 変形労働時間制等；（　　）単位の変形労働時間制・交替制
                <br />
                {wtMark(props.workTimeSystem, 'flex')}(3) ﾌﾚｯｸｽﾀｲﾑ制；始業及び終業の時刻は労働者の決定に委ねる。
                <br />
                {wtMark(props.workTimeSystem, 'outside')}(4) 事業場外みなし労働時間制
                <br />
                {wtMark(props.workTimeSystem, 'discretion')}(5) 裁量労働制
                <br /><br />
                ２　休憩時間（{props.breakTime}）
                <br /><br />
                ３　所定時間外労働の有無（{props.overtime}）
              </td>
            </tr>
            <tr>
              <td style={thStyle}>休日</td>
              <td style={tdStyle}>{props.holidays}</td>
            </tr>
            <tr>
              <td style={thStyle}>休暇</td>
              <td style={tdStyle}>
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
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#6B6B6B' }}>
          （次頁に続く）
        </div>
      </div>

      {/* ===== Page 2 ===== */}
      <div style={pageStyle} className="print-page-2">
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={thStyle}>賃金</td>
              <td style={tdStyle}>
                １　給与
                <br />
                　　基本給　{props.salary}円
                <br />
                　　固定残業代　{props.fixedOvertime}円
                <br />
                　　職務手当　{props.jobAllowance}円
                <br />
                <span style={{ fontWeight: 600 }}>合計　{props.salaryTotal}円</span>
                <br /><br />
                ２　通勤手当：{props.commutePay}
                <br /><br />
                ３　月単位での時間外割増し、深夜割増しおよび法定休日割増し支給。
                <br />
                　　手当額を超過する場合は、超過分を別途支給。
                <br /><br />
                ４　賃金締切日　{props.payClose}
                <br />
                ５　賃金支払日　{props.payDay}
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
              <td style={thStyle}>退職に関する<br />事項</td>
              <td style={tdStyle}>
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
              <td style={thStyle}>その他</td>
              <td style={tdStyle}>
                ・社会保険の加入状況（{props.insurance}）
                <br />
                ・雇用保険の適用（有）
                <br />
                ・その他（　　　　　　　　　　　　　　　　　　　　　　　　）
              </td>
            </tr>
            <tr>
              <td style={thStyle}></td>
              <td style={tdStyle}>
                以上のほかは、当社就業規則による。
                <br />
                就業規則を確認できる場所や方法（事務所内書庫および従業員システム）
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 16, fontSize: 10.5, color: '#6B6B6B', lineHeight: 1.7 }}>
          ※　本通知書の交付は、労働基準法第１５条に基づく労働条件の明示によるものです。
          <br />
          ※　労働条件通知書については、労使間の紛争の未然防止のため、保存しておくことをお勧めします。
        </div>
      </div>
    </>
  );
}
