import { useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations()

    return (
        <p className="my-16 mx-auto text-xs text-center w-3/4 sm:w-1/2">
            {t('this-knowledge-base-serves-as-a-valuable-tool-to-simplify-installations-troubleshoot-common-problems-and-enhance-the-overall-developer-experience-all-rights-reserved')}
        </p>
    )
}
