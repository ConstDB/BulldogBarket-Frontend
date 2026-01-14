import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import clsx from "clsx";

import Handshake from "../../assets/handshake.svg";
import Star from "../../assets/star.svg";
import StudentID from "../../assets/studentID.svg";

const FEATURES = [
  {
    icon: StudentID,
    title: "Verified Students Only",
    description:
      "Every user is verified via Student Number. Say goodbye to scammers and outsiders. You know exactly who you’re dealing with",
  },
  {
    icon: Handshake,
    title: "Safe Campus Meetups",
    description:
      "Designed for in-campus transactions. Meet at the Garden, Library, or Canteen. Save on shipping fees.",
  },
  {
    icon: Star,
    title: "Reputation System",
    description:
      "Upvote legit sellers and report issues. Out community-driven rating system keeps the marketplace healthy.",
  },
];

export default function Features() {
  return (
    <section className="w-full mt-32 bg-white relative z-10">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-20">Why Choose Barket?</h1>
        <p className="mt-4 text-xl text-center text-slate-700 max-w-2xl">
          We built this platform to solve the chaos of Facebook groups and ensure every transaction
          is secure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-16">
          {FEATURES.map((feature, index) => (
            <Card key={feature.title} className="bg-gray-50 border-gray-100 shadow gap-4!">
              <CardHeader>
                <div
                  className={clsx(
                    "mb-4 flex size-16 items-center justify-center rounded-lg p-4",
                    index % 2 === 0 ? "bg-blue-100" : "bg-yellow-100"
                  )}
                >
                  <img src={feature.icon} alt={feature.title} width={24} height={24} />
                </div>

                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
