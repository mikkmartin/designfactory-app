export const unsubscribe = async (email: string, last4: string) =>
  fetch(`/api/payment/unsubscribe/?email=${email}&last4=${last4}`).then(async res => {
    const json = await res.json()
    if (!res.ok) {
      return {
        error: {
          status: res.status,
          message: json.error,
        },
      }
    } else {
      return {
        status: res.status,
        message: json.message,
      }
    }
  })
