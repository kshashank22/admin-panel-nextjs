import ForgotPasswordData from "@/components/forgotPassword/ForgotPasswordData";

export async function forgotData(values: any) {
  const response = await fetch("api/forgotPasswordApi", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response;
}

const ForgotPasswordPage = () => {
  return (
    <div>
      <ForgotPasswordData />
    </div>
  );
};

export default ForgotPasswordPage;
