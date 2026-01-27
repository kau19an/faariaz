import { useTranslation } from "react-i18next";
import PageHead from "../components/seo/PageHead";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <PageHead titleKey="title.home" />
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">{t("wip.title")}</h1>
        <p>{t("wip.text")}</p>

        <div className="my-5 border-b border-gray-300"></div>

        <p className="mb-5 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          doloribus, nihil fugit dicta similique asperiores odit incidunt autem
          quod laborum ipsum magnam quo. Doloremque quam ut sapiente non,
          molestias reprehenderit! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quas sequi culpa fugit deserunt! Delectus impedit et
          cumque veniam fugiat deleniti praesentium repellat sed labore velit
          nihil animi, quis maiores. Molestiae! Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Dolor dignissimos autem soluta mollitia,
          odio ad rem est cum pariatur ratione aliquid, nihil explicabo at?
          Omnis repellat impedit reiciendis quia doloremque?
        </p>

        <p className="text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
          maiores, quas non perferendis ad assumenda harum officiis maxime,
          corrupti labore sapiente dolorum similique recusandae voluptates.
          Neque expedita doloremque animi sapiente. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Facilis recusandae animi assumenda id
          quaerat minima! Aperiam culpa, qui consequuntur quibusdam tempore
          dolor praesentium minus saepe temporibus iure excepturi, deleniti
          corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          architecto, magnam libero quas obcaecati modi, quia nihil voluptates
          iste omnis vitae dolore officia voluptas asperiores est culpa
          dignissimos dolores ipsum.
        </p>
      </div>
    </>
  );
}
