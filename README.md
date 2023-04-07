1.cloneした後にnpm install または yarn installをしてください。
2.サーバー起動はnpm run dev または yarn dev です。

Next.jsの書き方とルール

・フォルダの場所は必ず守る
    ・画面の一番上にあたる親ファイル(親コンポーネント)は pagesに配置
    ・コンポーネントは全てcomponentsに親ファイルの名前でフォルダを作成し、その中に配置
    ・CSSはstylesに親ファイルの名前で配置
    ・jotaiのatomのtsファイルはatomに配置(これはページを跨いで使うことがあるためフォルダは作成しなくて良い)

・CSSの書き方が少し違う
    ・今回は画面幅と高さを固定するレスポンシブを採用しているため、CSSは全てpx指定で。
    　横414px　縦896px (iphoneXのサイズ)が画面全部の大きさになってるからコレをマックスとしてpx指定で。
    ・CSSファイルは ファイル名.module.css とする。
    ・CSSの読み取りと使い方は以下の通り。Stylesにimportし、classNameでStyles.CSSファイルで作成したクラス名

        import Styles from "@/styles/App.module.css";

        export default function App({ Component, pageProps }: AppProps) {
            return (
                <div className={Styles.body}>
                </div>
            );
        }

・作業中のページの表示方法
    ・pages内に作ったファイル名を指定するだけ tamesi.tsxを表示したい場合
        ・localhost:3000/tamesi

・pagesにおく親ファイルの名前は小文字で、コンポーネントは UserName.tsx の様にパスカルケースで名前をつけること

・jotaiやuse〇〇系の使い方はReact勉強している前提で割愛

・画像はpublicフォルダのimagesに配置
    ・画像を使用する際はImageコンポーネントを使う。例は以下の通り。パスは/images/画像のファイル名 でアクセスできる。

        import Image from 'next/image';

        function MyComponent() {
            return (
                <div>
                    <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
                </div>
            );
        }

        export default MyComponent;