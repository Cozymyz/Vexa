package org.Vexa.model;

import java.util.ArrayList;
import java.util.List;

public class UserlocationExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UserlocationExample() {
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

        public Criteria andUserlocationIdIsNull() {
            addCriterion("UserLocation_Id is null");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdIsNotNull() {
            addCriterion("UserLocation_Id is not null");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdEqualTo(Integer value) {
            addCriterion("UserLocation_Id =", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdNotEqualTo(Integer value) {
            addCriterion("UserLocation_Id <>", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdGreaterThan(Integer value) {
            addCriterion("UserLocation_Id >", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("UserLocation_Id >=", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdLessThan(Integer value) {
            addCriterion("UserLocation_Id <", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdLessThanOrEqualTo(Integer value) {
            addCriterion("UserLocation_Id <=", value, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdIn(List<Integer> values) {
            addCriterion("UserLocation_Id in", values, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdNotIn(List<Integer> values) {
            addCriterion("UserLocation_Id not in", values, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdBetween(Integer value1, Integer value2) {
            addCriterion("UserLocation_Id between", value1, value2, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationIdNotBetween(Integer value1, Integer value2) {
            addCriterion("UserLocation_Id not between", value1, value2, "userlocationId");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameIsNull() {
            addCriterion("UserLocation_Name is null");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameIsNotNull() {
            addCriterion("UserLocation_Name is not null");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameEqualTo(String value) {
            addCriterion("UserLocation_Name =", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameNotEqualTo(String value) {
            addCriterion("UserLocation_Name <>", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameGreaterThan(String value) {
            addCriterion("UserLocation_Name >", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameGreaterThanOrEqualTo(String value) {
            addCriterion("UserLocation_Name >=", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameLessThan(String value) {
            addCriterion("UserLocation_Name <", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameLessThanOrEqualTo(String value) {
            addCriterion("UserLocation_Name <=", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameLike(String value) {
            addCriterion("UserLocation_Name like", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameNotLike(String value) {
            addCriterion("UserLocation_Name not like", value, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameIn(List<String> values) {
            addCriterion("UserLocation_Name in", values, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameNotIn(List<String> values) {
            addCriterion("UserLocation_Name not in", values, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameBetween(String value1, String value2) {
            addCriterion("UserLocation_Name between", value1, value2, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationNameNotBetween(String value1, String value2) {
            addCriterion("UserLocation_Name not between", value1, value2, "userlocationName");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceIsNull() {
            addCriterion("UserLocation_Introduce is null");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceIsNotNull() {
            addCriterion("UserLocation_Introduce is not null");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceEqualTo(String value) {
            addCriterion("UserLocation_Introduce =", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceNotEqualTo(String value) {
            addCriterion("UserLocation_Introduce <>", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceGreaterThan(String value) {
            addCriterion("UserLocation_Introduce >", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceGreaterThanOrEqualTo(String value) {
            addCriterion("UserLocation_Introduce >=", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceLessThan(String value) {
            addCriterion("UserLocation_Introduce <", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceLessThanOrEqualTo(String value) {
            addCriterion("UserLocation_Introduce <=", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceLike(String value) {
            addCriterion("UserLocation_Introduce like", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceNotLike(String value) {
            addCriterion("UserLocation_Introduce not like", value, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceIn(List<String> values) {
            addCriterion("UserLocation_Introduce in", values, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceNotIn(List<String> values) {
            addCriterion("UserLocation_Introduce not in", values, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceBetween(String value1, String value2) {
            addCriterion("UserLocation_Introduce between", value1, value2, "userlocationIntroduce");
            return (Criteria) this;
        }

        public Criteria andUserlocationIntroduceNotBetween(String value1, String value2) {
            addCriterion("UserLocation_Introduce not between", value1, value2, "userlocationIntroduce");
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