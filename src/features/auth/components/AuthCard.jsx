import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthCard = ({ showAuthCard }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`min-w-[250px] relative hidden ${showAuthCard ? "lg:block" : ""}`}
    >
      <Card
        className={
          "absolute top-5 rounded-2xl border-2 border-(--systemtext)! bg-secondary! shadow-sm overflow-hidden p-6!"
        }
      >
        {/* Nội dung giữ nguyên */}
        <div className="text-center">
          <h2 className="font-bold! text-xl! mb-2!">
            {t("login_or_register")}
          </h2>
          <p className="text-sm! text-(--systemtext)">
            {t("see_what_people_talk")}
          </p>
        </div>

        <Button className="w-full mt-2.5">
          <Link to="auth/login" className="text-base! flex justify-center">
            {t("login_with_username")}
          </Link>
        </Button>
      </Card>
    </div>
  );
};
export default AuthCard;
