package org.Vexa.model;

import java.util.ArrayList;
import java.util.List;

public class GeneralsettingExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public GeneralsettingExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andSettingIdIsNull() {
            addCriterion("Setting_Id is null");
            return (Criteria) this;
        }

        public Criteria andSettingIdIsNotNull() {
            addCriterion("Setting_Id is not null");
            return (Criteria) this;
        }

        public Criteria andSettingIdEqualTo(Integer value) {
            addCriterion("Setting_Id =", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdNotEqualTo(Integer value) {
            addCriterion("Setting_Id <>", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdGreaterThan(Integer value) {
            addCriterion("Setting_Id >", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("Setting_Id >=", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdLessThan(Integer value) {
            addCriterion("Setting_Id <", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdLessThanOrEqualTo(Integer value) {
            addCriterion("Setting_Id <=", value, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdIn(List<Integer> values) {
            addCriterion("Setting_Id in", values, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdNotIn(List<Integer> values) {
            addCriterion("Setting_Id not in", values, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdBetween(Integer value1, Integer value2) {
            addCriterion("Setting_Id between", value1, value2, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingIdNotBetween(Integer value1, Integer value2) {
            addCriterion("Setting_Id not between", value1, value2, "settingId");
            return (Criteria) this;
        }

        public Criteria andSettingNameIsNull() {
            addCriterion("Setting_Name is null");
            return (Criteria) this;
        }

        public Criteria andSettingNameIsNotNull() {
            addCriterion("Setting_Name is not null");
            return (Criteria) this;
        }

        public Criteria andSettingNameEqualTo(String value) {
            addCriterion("Setting_Name =", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameNotEqualTo(String value) {
            addCriterion("Setting_Name <>", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameGreaterThan(String value) {
            addCriterion("Setting_Name >", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameGreaterThanOrEqualTo(String value) {
            addCriterion("Setting_Name >=", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameLessThan(String value) {
            addCriterion("Setting_Name <", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameLessThanOrEqualTo(String value) {
            addCriterion("Setting_Name <=", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameLike(String value) {
            addCriterion("Setting_Name like", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameNotLike(String value) {
            addCriterion("Setting_Name not like", value, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameIn(List<String> values) {
            addCriterion("Setting_Name in", values, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameNotIn(List<String> values) {
            addCriterion("Setting_Name not in", values, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameBetween(String value1, String value2) {
            addCriterion("Setting_Name between", value1, value2, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingNameNotBetween(String value1, String value2) {
            addCriterion("Setting_Name not between", value1, value2, "settingName");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceIsNull() {
            addCriterion("Setting_Introduce is null");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceIsNotNull() {
            addCriterion("Setting_Introduce is not null");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceEqualTo(String value) {
            addCriterion("Setting_Introduce =", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceNotEqualTo(String value) {
            addCriterion("Setting_Introduce <>", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceGreaterThan(String value) {
            addCriterion("Setting_Introduce >", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceGreaterThanOrEqualTo(String value) {
            addCriterion("Setting_Introduce >=", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceLessThan(String value) {
            addCriterion("Setting_Introduce <", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceLessThanOrEqualTo(String value) {
            addCriterion("Setting_Introduce <=", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceLike(String value) {
            addCriterion("Setting_Introduce like", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceNotLike(String value) {
            addCriterion("Setting_Introduce not like", value, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceIn(List<String> values) {
            addCriterion("Setting_Introduce in", values, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceNotIn(List<String> values) {
            addCriterion("Setting_Introduce not in", values, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceBetween(String value1, String value2) {
            addCriterion("Setting_Introduce between", value1, value2, "settingIntroduce");
            return (Criteria) this;
        }

        public Criteria andSettingIntroduceNotBetween(String value1, String value2) {
            addCriterion("Setting_Introduce not between", value1, value2, "settingIntroduce");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}