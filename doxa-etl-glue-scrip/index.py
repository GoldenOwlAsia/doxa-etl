import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

## @params: [JOB_NAME]
args = getResolvedOptions(sys.argv, ['JOB_NAME'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)
## @type: DataSource
## @args: [database = "todo-db", table_name = "task_doxa_etl", transformation_ctx = "datasource0"]
## @return: datasource0
## @inputs: []
datasource0 = glueContext.create_dynamic_frame.from_catalog(database = "todo-db", table_name = "task_doxa_etl", transformation_ctx = "datasource0")
## @type: ApplyMapping
## @args: [mapping = [("completed", "boolean", "completed", "boolean"), ("title", "string", "title", "string"), ("userid", "int", "user_id", "int"), ("partition_0", "string", "partition_0", "string"), ("partition_1", "string", "partition_1", "string"), ("partition_2", "string", "partition_2", "string")], transformation_ctx = "applymapping1"]
## @return: applymapping1
## @inputs: [frame = datasource0]
applymapping1 = ApplyMapping.apply(frame = datasource0, mappings = [("completed", "boolean", "completed", "boolean"), ("title", "string", "title", "string"), ("userid", "int", "user_id", "int"), ("partition_0", "string", "partition_0", "string"), ("partition_1", "string", "partition_1", "string"), ("partition_2", "string", "partition_2", "string")], transformation_ctx = "applymapping1")
## @type: SelectFields
## @args: [paths = ["user_id", "title", "completed"], transformation_ctx = "selectfields2"]
## @return: selectfields2
## @inputs: [frame = applymapping1]
selectfields2 = SelectFields.apply(frame = applymapping1, paths = ["user_id", "title", "completed"], transformation_ctx = "selectfields2")
## @type: ResolveChoice
## @args: [choice = "MATCH_CATALOG", database = "todo-final-db", table_name = "tasks", transformation_ctx = "resolvechoice3"]
## @return: resolvechoice3
## @inputs: [frame = selectfields2]
resolvechoice3 = ResolveChoice.apply(frame = selectfields2, choice = "MATCH_CATALOG", database = "todo-final-db", table_name = "tasks", transformation_ctx = "resolvechoice3")
## @type: DataSink
## @args: [database = "todo-final-db", table_name = "tasks", transformation_ctx = "datasink4"]
## @return: datasink4
## @inputs: [frame = resolvechoice3]
datasink4 = glueContext.write_dynamic_frame.from_catalog(frame = resolvechoice3, database = "todo-final-db", table_name = "tasks", transformation_ctx = "datasink4")
# datasink4 = glueContext.write_dynamic_frame.from_options(frame = resolvechoice3, connection_type = "s3", connection_options = {"path": "s3://doxa-etl-processed", partitionKeys: ["year", "month", "date"] }, format = "json", transformation_ctx = "datasink4")

job.commit()
