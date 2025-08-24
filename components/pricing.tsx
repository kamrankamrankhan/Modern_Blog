import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: ["Up to 5 team members", "Basic analytics", "10GB storage", "Email support", "Core integrations"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Best for growing businesses",
    features: [
      "Up to 25 team members",
      "Advanced analytics",
      "100GB storage",
      "Priority support",
      "All integrations",
      "Custom workflows",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "AI-powered insights",
      "Unlimited storage",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
    ],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#f6f6f7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#141624]">Simple, transparent pricing</h2>
          <p className="text-xl text-[#52525b] max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-[#ffffff] p-8 rounded-2xl shadow-sm relative ${
                plan.popular ? "ring-2 ring-[#4b6bfb] scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#4b6bfb] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#141624] mb-2">{plan.name}</h3>
                <p className="text-[#52525b] mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-[#141624]">{plan.price}</span>
                  <span className="text-[#a1a1aa] ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-[#4b6bfb] mr-3 flex-shrink-0" />
                    <span className="text-[#52525b]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#4b6bfb] hover:bg-[#3b5beb] text-white"
                    : "bg-[#f4f4f5] hover:bg-[#e8e8ea] text-[#141624]"
                }`}
                size="lg"
              >
                Start Free Trial
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
