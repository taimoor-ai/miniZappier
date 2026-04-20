const evaluateSingleCondition = (payloadValue, operator, expectedValue) => {
  switch (operator) {
    case ">":
      return payloadValue > expectedValue;

    case "<":
      return payloadValue < expectedValue;

    case ">=":
      return payloadValue >= expectedValue;

    case "<=":
      return payloadValue <= expectedValue;

    case "==":
      return payloadValue == expectedValue;

    case "!=":
      return payloadValue != expectedValue;

    case "includes":
      if (typeof payloadValue === "string") {
        return payloadValue.includes(expectedValue);
      }

      if (Array.isArray(payloadValue)) {
        return payloadValue.includes(expectedValue);
      }

      return false;

    default:
      return false;
  }
};

const evaluateConditions = (conditions, payload) => {
  // Agar koi conditions nahi hain to automation chalni chahiye
  if (!conditions || conditions.length === 0) {
    return true;
  }

  return conditions.every((condition) => {
    const payloadValue = payload[condition.field];

    return evaluateSingleCondition(
      payloadValue,
      condition.operator,
      condition.value
    );
  });
};

module.exports = evaluateConditions;